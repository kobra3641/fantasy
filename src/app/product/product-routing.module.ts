import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductViewComponent} from "./product-view/product-view.component";

const routes: Routes = [
  { path: ':id', component: ProductViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
