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
  public currentRegion = this.getRegion();

  constructor(
    private region: Regions,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<RegionComponent>
  ) {
  }

  ngOnInit(): void {
    this.regions = this.region.regions;
  }

  public getRegion() {
    return JSON.parse(localStorage.getItem('region') || '')
  }

  public openRegion(region: any) {
    this.storageService.setRegion(region);
    this.closeDialog();
    // location.reload();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
