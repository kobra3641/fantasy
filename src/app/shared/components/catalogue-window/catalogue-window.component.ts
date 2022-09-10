import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../core/services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-catalogue-window',
  templateUrl: './catalogue-window.component.html',
  styleUrls: ['./catalogue-window.component.css']
})
export class CatalogueWindowComponent implements OnInit, AfterViewInit {
  arr = Array;
  arrFirst: Array<any> = [];
  arrSecond: Array<any> = [];
  viewCollection: Array<any> = [];
  title: String;
  start: any[] = [];
  ele: any;
  rBack: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CatalogueWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.title = String('Каталог');
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(data => {
      const firstLevel = data.filter((item: any) => item.catalog_child_id == 0);
      this.arrFirst = firstLevel.map((itemFirst: any) => {
        const elementsSecondLevel = data.filter((findItem: any) => findItem.catalog_child_id == itemFirst.id);
        this.arrSecond = elementsSecondLevel.map((itemSecond: any) => {
          const elementsThirdLevel = data.filter((findItem: any) => findItem.catalog_child_id == itemSecond.id);
          return {...itemSecond, data: elementsThirdLevel};
        })
        return {...itemFirst, data: this.arrSecond};
      });
      this.viewCollection = this.arrFirst;
      this.start = this.arrFirst;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {

  }

  checkLengthChildElements(data: Array<any>): Array<number> {
    if(!data)
      return new Array<number>();
    else if(data.length >= 3)
      return [0,1,2];
    else {
      const array: Array<number> = new Array<number>();
      for(let i = 0; i < data.length; i++) {
        array.push(i);
      }
      return array;
    }
  }

  openNextLevel(element: any) {
    if (element.data) {
      this.title = element.name;
      this.ele = element;
      this.viewCollection = element.data.map((item: any) => {
        return {...item, data: item.data}
      })

      this.rBack.push(element.name)
    }
    else {
      this.categoryService.saveCatalog(element);
      this.router.navigate([`catalogue/${element.path}`]).then();
      this.dialogRef.close();
    }
  }

  returnBack() {
    if (this.rBack.length == 1) {
      this.title = 'Каталог';
      this.viewCollection = this.arrFirst;
      this.rBack = [];
    }
    if (this.rBack.length == 2) {
      this.start.filter((item: any) => {
        if(item.name === this.rBack[0]) {
          return this.viewCollection = item.data
        }
      })
      this.rBack.pop();
      this.title = this.rBack[0];
    }
  }

  openThirdLevel(element: any) {
    if (element.data) {
      this.title = element.name;
      this.viewCollection = element.data;
      this.rBack.push('Каталог')
    }
    else {
      this.categoryService.saveCatalog(element);
      this.router.navigate([`catalogue/${element.path}`]).then();
      this.dialogRef.close();
    }
  }
}
