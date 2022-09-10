import { NgModule } from '@angular/core';
import { ShopViewComponent } from './shop-view/shop-view.component';
import {ShopRoutingModule} from "./shop-routing.module";
import { ShopComponent } from './shop.component';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [
    ShopViewComponent,
    ShopComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ShopRoutingModule
  ],
  exports: [
    ShopViewComponent
  ]
})
export class ShopModule { }
