import {Injectable} from "@angular/core";
import {CatalogueWindowComponent} from "../../shared/components/catalogue-window/catalogue-window.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {RegionComponent} from "../../shared/components/region/region.component";
import {SearchBarComponent} from "../../shared/components/search-bar/search-bar.component";

@Injectable()
export class DialogManager {

  private _height: string = '100%';
  private _width: string = '100%';
  private _maxWidth: string = '100%';
  private _enterAnimationDuration: string = '0ms';
  private _exitAnimationDuration: string = '0ms';
  private readonly matDialogConfig: MatDialogConfig;

  constructor(
    private dialog: MatDialog
  ) {
    this.matDialogConfig = {
      height: this._height,
      width: this._width,
      maxWidth: this._maxWidth,
      enterAnimationDuration: this._enterAnimationDuration,
      exitAnimationDuration: this._exitAnimationDuration
    }
  }

  public openCatalogueDialog(): MatDialogRef<CatalogueWindowComponent> {
    return this.dialog.open(CatalogueWindowComponent, this.matDialogConfig);
  }

  public openRegionDialog(): MatDialogRef<RegionComponent> {
    return this.dialog.open(RegionComponent, this.matDialogConfig);
  }

  public openSearchBarDialog(): MatDialogRef<SearchBarComponent> {
    return this.dialog.open(SearchBarComponent, this.matDialogConfig);
  }
}
