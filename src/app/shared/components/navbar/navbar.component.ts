import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
// import {CatalogComponent} from "../../../catalog/catalog.component";
import {RegionComponent} from "../region/region.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'fantasy';
  region = this.getRegion();


  constructor(private dialog: MatDialog, public router: Router){}


  ngOnInit(): void {
  }


  // openCatalogDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(CatalogComponent, {
  //     height: '100%',
  //     width: '100%',
  //     maxWidth: '100%',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
  // openRegionDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(RegionComponent, {
  //     height: '100%',
  //     width: '100%',
  //     maxWidth: '100%',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
  // openSearchBarDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(SearchBarComponent, {
  //     height: '100%',
  //     width: '100%',
  //     maxWidth: '100%',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  public getRegion() {
    if (localStorage.getItem('region'))
      console.log(localStorage.getItem('region'))
    else
      localStorage.setItem('region', JSON.stringify({"name":"moscow","rus_name":"Москва, Московская область","coords":[55.755864,37.617698]}))
    return JSON.parse(localStorage.getItem('region') || '')
  }

}
