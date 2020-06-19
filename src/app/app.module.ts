import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { FilterByBrandComponent } from './components/filter-by-brand/filter-by-brand.component';
import { FilterByCategoryComponent } from './components/filter-by-category/filter-by-category.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ItemsViewComponent } from './components/items-view/items-view.component';
import { ItemComponent, ItemDetailsDialog } from './components/item/item.component';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { CartViewComponent, DialogDataExampleDialog, ReceiptDialog } from './components/cart-view/cart-view.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { OrderByComponent } from './components/order-by/order-by.component';

import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      MenuBarComponent,
      FilterByBrandComponent,
      FilterByCategoryComponent,
      SearchBarComponent,
      ItemsViewComponent,
      ItemComponent,
      CartPreviewComponent,
      CartViewComponent,
      ItemDetailsDialog,
      DialogDataExampleDialog,
      ReceiptDialog,
      MenuItemComponent,
      OrderByComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatMenuModule,
      MatIconModule,
      HttpClientModule,
      MatTabsModule,
      MatCardModule,
      MatGridListModule,
      MatCheckboxModule,
      FormsModule,
      MatListModule,
      MatTooltipModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatTreeModule,
      MatBadgeModule,
      MatTableModule,
      FlexLayoutModule,
      MatButtonModule,
      MatExpansionModule,
      MatToolbarModule,
      MatSortModule,
      DragDropModule,
      FlexModule,
      GridModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
