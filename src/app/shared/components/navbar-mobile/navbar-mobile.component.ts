import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DialogManager} from "../../../core/services/dialog.manager";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css'],
})
export class NavbarMobileComponent implements OnInit {

  region = this.getRegion();

  constructor(public dialogRef: MatDialogRef<NavbarMobileComponent>, private dialogManager: DialogManager, private router: Router) { }

  ngOnInit(): void {
  }

  public onClose(): void {
    document.getElementsByClassName('openNavbarMobileAnimation')[0].classList.add('closeNavbarMobileAnimation')
    document.getElementsByClassName('openNavbarMobileAnimation')[0].classList.remove('openNavbarMobileAnimation')
    setTimeout(()=>{this.dialogRef.close()}, 1000)
  }

  public getRegion() {
    if (localStorage.getItem('region'))
      console.log(localStorage.getItem('region'))
    else
      localStorage.setItem('region', JSON.stringify({"name":"moscow","rus_name":"Москва, Московская область","coords":[55.755864,37.617698]}))
    return JSON.parse(localStorage.getItem('region') || '')
  }

  public openCatalogueDialog(): void {
    this.dialogManager.openCatalogueDialog();
    this.dialogRef.close()
  }

  public openRegionDialog(): void {
    this.dialogManager.openRegionDialog();
    this.dialogRef.close()
  }

  public openShopsDialog(): void {
    this.router.navigate(['shop']).then();
  }
}
