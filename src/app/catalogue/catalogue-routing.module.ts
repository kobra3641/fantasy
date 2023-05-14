import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogueViewComponent} from "./catalogue-view/catalogue-view.component";
import {CatalogueItemEditComponent} from "./catalogue-item-edit/catalogue-item-edit.component";
import {CatalogueEditComponent} from "./catalogue-edit/catalogue-edit.component";
import {CatalogueFilterEditComponent} from "./catalogue-filter-edit/catalogue-filter-edit.component";

const routes: Routes = [
  { path: 'edit', component: CatalogueEditComponent},
  { path: 'edit/:id', component: CatalogueFilterEditComponent},
  { path: ':catalogName', component: CatalogueViewComponent},
  { path: ':catalogName/:id/catalogue-edit', component: CatalogueItemEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
