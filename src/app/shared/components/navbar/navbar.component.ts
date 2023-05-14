import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {DialogManager} from "../../../core/services/dialog.manager";
import {CookieService} from "ngx-cookie-service";
import {StorageService} from "../../../core/services/storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  title = 'fantasy';
  region = 'Выберите город';

  regionDialog: any;
  catalogueDialog: any;

  public goods: any;

  constructor(public router: Router,
              private renderer: Renderer2,
              private dialogManager: DialogManager,
              private storageService: StorageService
  ){
  }

  ngOnInit(): void {
    this.storageService.region$.subscribe((region: any) => {
      this.region = region?.rus_name;
    })
  }

  public getRegion() {
    if (localStorage.getItem('region'))
      // console.log(localStorage.getItem('region'))
    {}
    else
      localStorage.setItem('region', JSON.stringify({"name":"moscow","rus_name":"Москва, Московская область","coords":[55.755864,37.617698]}))
    return JSON.parse(localStorage.getItem('region') || '')
  }

  public openNavbarMobileDialog(): void {
    if (this.regionDialog) {
      this.regionDialog.close();
    }
    if (this.catalogueDialog) {
      this.catalogueDialog.close();
    }
    this.dialogManager.openNavbarMobileDialog();
  }

  public openCatalogueDialog(): void {
    if (this.regionDialog) {
      this.regionDialog.close();
    }
    if (this.catalogueDialog) {
      this.catalogueDialog.close();
    }
    this.catalogueDialog = this.dialogManager.openCatalogueDialog();
  }

  public openRegionDialog(): void {
    if (this.regionDialog) {
      this.regionDialog.close();
    }
    if (this.catalogueDialog) {
      this.catalogueDialog.close();
    }
    this.regionDialog = this.dialogManager.openRegionDialog();
    // if (!this.dialogOpen) {
    //   this.regionDialog = this.dialogManager.openRegionDialog();
    //   this.regionDialog.afterClosed().subscribe(()=>{
    //     this.dialogOpen = !this.dialogOpen
    //   })
    //   this.dialogOpen = !this.dialogOpen
    // }

  }
  //
  // public openSearchBarDialog(): void {
  //   if (this.regionDialog) {
  //     this.regionDialog.close();
  //   }
  //   if (this.catalogueDialog) {
  //     this.catalogueDialog.close();
  //   }
  //   this.dialogManager.openSearchBarDialog();
  // }

  public openShops(): void {
    if (this.regionDialog) {
      this.regionDialog.close();
    }
    if (this.catalogueDialog) {
      this.catalogueDialog.close();
    }
    this.router.navigate(['shop']).then();
  }


  public openCart(): void {
    if (this.regionDialog) {
      this.regionDialog.close();
    }
    if (this.catalogueDialog) {
      this.catalogueDialog.close();
    }
    this.router.navigate(['basket']).then();
  }


  public openNewSearchbar(darkness: HTMLDivElement, elements: HTMLDivElement, input: HTMLInputElement) {
    darkness.style.visibility = 'visible';
    darkness.style.opacity = '1';

    elements.style.width = '0';
    elements.style.opacity = '0';

    input.style.width = '100%';
    console.log(input)
    // disp.classList.add('header-component-disable')
  }

}
