import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Regions} from "../../../core/configurations/regions";
import {StorageService} from "../../../core/services/storage.service";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  public regionRusName: string = '';
  public regions: any;

  constructor(
    private region: Regions,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<RegionComponent>
  ) {
  }

  ngOnInit(): void {
    this.regions = this.region.regions;
  }

  public openRegion(region: any) {
    this.storageService.setRegion(region);
    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
