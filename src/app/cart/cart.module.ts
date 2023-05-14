import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import {CartRoutingModule} from "./cart-routing.module";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    CartComponent,
    CartViewComponent
  ],
  imports: [
    CoreModule,
    CartRoutingModule,
    SharedModule
  ],
  exports: [
    CartViewComponent
  ]
})
export class CartModule { }
