import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopViewComponent} from "./shop-view/shop-view.component";

const routes: Routes = [
  { path: '', component: ShopViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
