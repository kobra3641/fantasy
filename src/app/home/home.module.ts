import { NgModule } from '@angular/core';
import { HomeViewComponent } from './home-view/home-view.component';
import {HomeRoutingModule} from "./home-routing.module";
import { HomeComponent } from './home.component';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import { LongBannerEditComponent } from './long-banner-edit/long-banner-edit.component';
import {MatCardModule} from "@angular/material/card";
@NgModule({
  declarations: [
    HomeViewComponent,
    HomeComponent,
    LongBannerEditComponent
  ],
    imports: [
        CoreModule,
        SharedModule,
        HomeRoutingModule,
        MatCardModule
    ],
  exports: [
    HomeViewComponent,
    LongBannerEditComponent
  ]
})
export class HomeModule { }
