import { Component, OnInit } from '@angular/core';
import {DialogManager} from "../../core/services/dialog.manager";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['../home.component.css']
})
export class HomeViewComponent implements OnInit {

  constructor(
    private dialogManager: DialogManager
  ) { }

  ngOnInit(): void {
  }

  public openCatalogWindow() {
    this.dialogManager.openCatalogueDialog();
  }
}
