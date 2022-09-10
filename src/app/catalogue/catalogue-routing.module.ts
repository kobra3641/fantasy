import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogueViewComponent} from "./catalogue-view/catalogue-view.component";

const routes: Routes = [
  { path: ':catalogName', component: CatalogueViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
