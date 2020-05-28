import { Component, Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { ItemViewService } from 'src/app/services/item-view.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Category } from 'src/app/category';
import { Item } from 'src/app/item';
import { ItemView } from 'src/app/itemView';

/** Flat to-do item node with expandable and level information */

class ItemType {
  children: ItemType[];
  item: string;
  category: Category;
}

class ItemTypeFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  category: Category;
}

@Component({
  selector: 'app-filter-by-type',
  templateUrl: './filter-by-category.component.html',
  styleUrls: ['./filter-by-category.component.css'],
  providers: []
})
export class FilterByCategoryComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ItemTypeFlatNode, ItemType>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<ItemType, ItemTypeFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: ItemTypeFlatNode | null = null;

  treeControl: FlatTreeControl<ItemTypeFlatNode>;

  treeFlattener: MatTreeFlattener<ItemType, ItemTypeFlatNode>;

  dataSource: MatTreeFlatDataSource<ItemType, ItemTypeFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ItemTypeFlatNode>(true /* multiple */);

  constructor(database: DatabaseService, private itemView: ItemViewService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemTypeFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.currentItems.subscribe(data => {
      this.dataSource.data = this.prepareDataForTree(data);

      this.checklistSelection.clear();
      this.checklistSelection.select(...this.treeFlattener.flattenNodes(this.dataSource.data));
      this.emitChangedCategories();
    });
  }

  toItemCategoryNode(category: Category) {

    const newItemCategoryNode = new ItemType();
    newItemCategoryNode.category = category;
    newItemCategoryNode.item = category.name;

    if (category.children !== undefined) {
      newItemCategoryNode.children = category.children.map(c => this.toItemCategoryNode(c));
    } else {
      newItemCategoryNode.children = [];
    }

    return newItemCategoryNode;
  }

  prepareDataForTree(items: ItemView[]): ItemType[] {
    return [...new Set(items.map(item => {
      let current = item.category;
      while (current.parent) { current = current.parent; }
      return current;
    }
    ))].map(c => this.toItemCategoryNode(c));
  }

  getLevel = (node: ItemTypeFlatNode) => node.level;

  isExpandable = (node: ItemTypeFlatNode) => node.expandable;

  getChildren = (node: ItemType): ItemType[] => node.children;

  hasChild = (_: number, nodeData: ItemTypeFlatNode) => nodeData.expandable;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: ItemType, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new ItemTypeFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = node.children.length > 0;
    flatNode.category = node.category;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: ItemTypeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ItemTypeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: ItemTypeFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );

    this.checkAllParentsSelection(node);

    this.emitChangedCategories();
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: ItemTypeFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);

    this.emitChangedCategories();
  }

  emitChangedCategories() {
    this.itemView.changedCategories(
      (this.checklistSelection.selected.filter(s => !s.expandable)
        .sort((a, b) => a.level - b.level))
        .map(se => se.category));
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: ItemTypeFlatNode): void {
    let parent: ItemTypeFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: ItemTypeFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: ItemTypeFlatNode): ItemTypeFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
