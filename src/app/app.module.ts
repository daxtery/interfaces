import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { FilterByBrandComponent } from './components/filter-by-brand/filter-by-brand.component';
import { FilterByTypeComponent } from './components/filter-by-type/filter-by-type.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ItemsViewComponent } from './components/items-view/items-view.component';
import { ItemComponent } from './components/item/item.component';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      MenuBarComponent,
      FilterByBrandComponent,
      FilterByTypeComponent,
      SearchBarComponent,
      ItemsViewComponent,
      ItemComponent,
      CartPreviewComponent
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
      MatListModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
