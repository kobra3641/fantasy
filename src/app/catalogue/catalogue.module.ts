import { NgModule } from '@angular/core';
import { CatalogueViewComponent } from './catalogue-view/catalogue-view.component';
import {CoreModule} from "../core/core.module";
import { CatalogueFilterComponent } from './catalogue-filter/catalogue-filter.component';
import { CatalogueItemsComponent } from './catalogue-items/catalogue-items.component';
import {CatalogueRoutingModule} from "./catalogue-routing.module";
import { CatalogueComponent } from './catalogue.component';
import {SharedModule} from "../shared/shared.module";
import { CatalogueItemEditComponent } from './catalogue-item-edit/catalogue-item-edit.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import { CatalogueEditComponent } from './catalogue-edit/catalogue-edit.component';
import { CatalogueFilterEditComponent } from './catalogue-filter-edit/catalogue-filter-edit.component';

@NgModule({
  declarations: [
    CatalogueViewComponent,
    CatalogueFilterComponent,
    CatalogueItemsComponent,
    CatalogueComponent,
    CatalogueItemEditComponent,
    CatalogueEditComponent,
    CatalogueFilterEditComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    CatalogueRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule
  ]
})
export class CatalogueModule { }
