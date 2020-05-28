import { Item } from './item';
import { Category } from './category';

export class ItemView extends Item {
    category: Category;

    constructor(item: Item, category: Category) {
        super(item.id, item.name, item.brand, item.categoryNames, item.unitaryPrice, item.unitaryWeight, item.weightType, item.pictureUrl);
        this.category = category;
    }
}
