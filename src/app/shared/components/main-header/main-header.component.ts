import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DialogManager} from "../../../core/services/dialog.manager";
import {StorageService} from "../../../core/services/storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit, OnDestroy {

  protected region: any;
  private subscriptions = new Subscription();

  constructor(
    private dialogManager: DialogManager,
    private storageService: StorageService,
    public router: Router
  )
  {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.storageService.region$.subscribe((region) => {
        this.region = region;
      })
    )
  }

  public openCatalogueDialog(): void {
    this.dialogManager.openCatalogueDialog();
  }

  public openRegionDialog(): void {
    this.dialogManager.openRegionDialog();
  }

  public openSearchBarDialog(): void {
    this.dialogManager.openSearchBarDialog();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
