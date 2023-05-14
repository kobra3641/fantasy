import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {ProductViewComponent} from "./product-view/product-view.component";
import {ProductComponent} from "./product.component";
import {ProductRoutingModule} from "./product-routing.module";

@NgModule({
  declarations: [
    ProductViewComponent,
    ProductComponent
  ],
  imports: [
    CoreModule,
    ProductRoutingModule,
    SharedModule,
  ],
  exports: [
    ProductViewComponent
  ]
})
export class ProductModule { }
