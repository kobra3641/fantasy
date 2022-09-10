import { NgModule } from '@angular/core';
import { HomeViewComponent } from './home-view/home-view.component';
import {HomeRoutingModule} from "./home-routing.module";
import { HomeComponent } from './home.component';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [
    HomeViewComponent,
    HomeComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    HomeViewComponent
  ]
})
export class HomeModule { }
