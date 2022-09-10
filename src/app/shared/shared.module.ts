import { NgModule } from '@angular/core';
import { CatalogueWindowComponent } from './components/catalogue-window/catalogue-window.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import {FilterRegionPipe} from "./pipes/filter-region.pipe";
import {CoreModule} from "../core/core.module";
import {SearchBarComponent} from "./components/search-bar/search-bar.component";
import {RegionComponent} from "./components/region/region.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

@NgModule({
  declarations: [
    CatalogueWindowComponent,
    MainHeaderComponent,
    MainFooterComponent,
    FilterRegionPipe,
    SearchBarComponent,
    RegionComponent,
    NavbarComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    CatalogueWindowComponent,
    MainHeaderComponent,
    MainFooterComponent,
    FilterRegionPipe,
    SearchBarComponent,
    RegionComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
