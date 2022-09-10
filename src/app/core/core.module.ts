import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Regions} from "./configurations/regions";
import {ApiHttpService} from "./services/api.http.service";
import {CommonService} from "./services/common.service";
import {ElasticsearchQueryManager} from "./services/elasticsearch.query.manager";
import {QueryParametersService} from "./services/query.parameters.service";
import {ElasticsearchRequestBuilder} from "./services/elasticsearch.request.builder";
import {ApiConstants} from "./configurations/api.constants";
import {MatButtonModule} from "@angular/material/button";
import {NgxPaginationModule} from "ngx-pagination";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {RouterModule} from "@angular/router";
import {DialogManager} from "./services/dialog.manager";
import {StorageService} from "./services/storage.service";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  imports: [
  ],
  exports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    NgxPaginationModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [
    ApiConstants,
    Regions,
    ApiHttpService,
    CommonService,
    ElasticsearchQueryManager,
    QueryParametersService,
    ElasticsearchRequestBuilder,
    DialogManager,
    StorageService
  ]
})
export class CoreModule { }
