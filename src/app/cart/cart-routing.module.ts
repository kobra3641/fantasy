import {RouterModule, Routes} from "@angular/router";
import {CartViewComponent} from "./cart-view/cart-view.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', component: CartViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }


