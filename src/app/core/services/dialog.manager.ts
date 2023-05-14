import {Injectable} from "@angular/core";
import {CatalogueWindowComponent} from "../../shared/components/catalogue-window/catalogue-window.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {RegionComponent} from "../../shared/components/region/region.component";
import {SearchBarComponent} from "../../shared/components/search-bar/search-bar.component";
import {ShopComponent} from "../../shop/shop.component";
import {LongBannerEditComponent} from "../../home/long-banner-edit/long-banner-edit.component";
import {NavbarMobileComponent} from "../../shared/components/navbar-mobile/navbar-mobile.component";
import {CatalogueFilterEditComponent} from "../../catalogue/catalogue-filter-edit/catalogue-filter-edit.component";

@Injectable()
export class DialogManager {

  private _fullSizeHeight: string = '100%';
  private _fullSizeWidth: string = '100%';
  private _halfSizeHeight: string = '50%';
  private _halfSizeWidth: string = '50%';
  private _maxWidth: string = '100%';
  private _enterAnimationDuration: string = '0ms';
  private _exitAnimationDuration: string = '0ms';
  private readonly matDialogConfigFullSize: MatDialogConfig;
  private readonly matDialogConfigHalfSize: MatDialogConfig;

  constructor(
    private dialog: MatDialog
  ) {
    this.matDialogConfigFullSize = {
      height: this._fullSizeHeight,
      width: this._fullSizeWidth,
      maxWidth: this._maxWidth,
      enterAnimationDuration: this._enterAnimationDuration,
      exitAnimationDuration: this._exitAnimationDuration
    }
    this.matDialogConfigHalfSize = {
      enterAnimationDuration: this._enterAnimationDuration,
      exitAnimationDuration: this._exitAnimationDuration
    }
  }

  public openCatalogueDialog(): MatDialogRef<CatalogueWindowComponent> {
    return this.dialog.open(CatalogueWindowComponent, {
      ...this.matDialogConfigFullSize,
      panelClass: ['region-dialog'],
      hasBackdrop: false,
      // disableClose: true
    });
  }

  public openRegionDialog(): MatDialogRef<RegionComponent> {
    return this.dialog.open(RegionComponent, {
      ...this.matDialogConfigFullSize,
      panelClass: ['region-dialog'],
      hasBackdrop: false,
      // disableClose: true
    });
  }

  public openSearchBarDialog(): MatDialogRef<SearchBarComponent> {
    return this.dialog.open(SearchBarComponent, this.matDialogConfigFullSize);
  }

  public openShopsDialog(): MatDialogRef<ShopComponent> {
    return this.dialog.open(ShopComponent, this.matDialogConfigFullSize);
  }

  public openLongBannerEditDialog(): MatDialogRef<LongBannerEditComponent> {
    return this.dialog.open(LongBannerEditComponent, this.matDialogConfigHalfSize)
  }

  public openNavbarMobileDialog(): MatDialogRef<NavbarMobileComponent> {
    return this.dialog.open(NavbarMobileComponent,
      {
      ...this.matDialogConfigHalfSize,
        direction: 'ltr',
        height: '100%',
        panelClass: ['navbarMobileAnimation', 'openNavbarMobileAnimation'],
    })
  }

  public openFilterEditDialog(data: any): MatDialogRef<CatalogueFilterEditComponent> {
    return this.dialog.open(CatalogueFilterEditComponent, {...this.matDialogConfigHalfSize, data: data})
  }
}
