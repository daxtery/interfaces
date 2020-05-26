import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsViewComponent } from './components/items-view/items-view.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ItemsViewComponent
      },
      {
        path: 'cart',
        component: CartViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
