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

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatTabsModule } from '@angular/material/tabs';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      MenuBarComponent,
      FilterByBrandComponent,
      FilterByTypeComponent,
      SearchBarComponent,
      ItemsViewComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatMenuModule,
      MatIconModule,
      HttpClientModule,
      MatTabsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
