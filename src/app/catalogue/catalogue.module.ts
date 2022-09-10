import { NgModule } from '@angular/core';
import { CatalogueViewComponent } from './catalogue-view/catalogue-view.component';
import {CoreModule} from "../core/core.module";
import { CatalogueFilterComponent } from './catalogue-filter/catalogue-filter.component';
import { CatalogueItemsComponent } from './catalogue-items/catalogue-items.component';
import {CatalogueRoutingModule} from "./catalogue-routing.module";
import { CatalogueComponent } from './catalogue.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    CatalogueViewComponent,
    CatalogueFilterComponent,
    CatalogueItemsComponent,
    CatalogueComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    CatalogueRoutingModule
  ],
  exports: [
    CatalogueViewComponent,
    CatalogueFilterComponent,
    CatalogueItemsComponent
  ]
})
export class CatalogueModule { }
