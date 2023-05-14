import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import {DialogManager} from "../../core/services/dialog.manager";
import {Subscription} from "rxjs";
import {CatalogOption} from "../models/catalog.option";

@Component({
  selector: 'app-catalogue-edit',
  templateUrl: './catalogue-edit.component.html',
  styleUrls: ['./catalogue-edit.component.css']
})
export class CatalogueEditComponent implements OnInit {

  public startCollection: any[] = [];
  public viewCollection: any[] = [];

  public secondCollection: any[] = [];
  public thirdCollection: any[] = [];

  public secondElement: any[] = [];
  public thirdElement: any[] = [];

  public elementEdit: any | undefined = undefined;

  public thirdElementEdit: any | undefined = undefined;
  @ViewChild('thirdElementInput') thirdElementInput: any;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private dialogManager: DialogManager
  ) { }

  ngOnInit(): void {
    let arrFirst: any = [];
    let arrSecond: any = [];

    const subscription: Subscription = this.categoryService.findAll().subscribe( {
      next: (data) => {
        const firstLevel = data.filter((item: any) => item.child_id == 0);
        arrFirst = firstLevel.map((itemFirst: any) => {
          const elementsSecondLevel = data.filter((findItem: any) => findItem.child_id == itemFirst.id);
          arrSecond = elementsSecondLevel.map((itemSecond: any) => {
            const elementsThirdLevel = data.filter((findItem: any) => findItem.child_id == itemSecond.id);
            return {...itemSecond, data: elementsThirdLevel};
          })
          return {...itemFirst, data: arrSecond};
        });
        this.startCollection = arrFirst;
        this.viewCollection = arrFirst;
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
    //
    // this.categoryService.findAll().subscribe(data => {
    //   const firstLevel = data.filter((item: any) => item.child_id == 0);
    //   arrFirst = firstLevel.map((itemFirst: any) => {
    //     const elementsSecondLevel = data.filter((findItem: any) => findItem.child_id == itemFirst.id);
    //     arrSecond = elementsSecondLevel.map((itemSecond: any) => {
    //       const elementsThirdLevel = data.filter((findItem: any) => findItem.child_id == itemSecond.id);
    //       return {...itemSecond, data: elementsThirdLevel};
    //     })
    //     return {...itemFirst, data: arrSecond};
    //   });
    //   this.startCollection = arrFirst;
    //   this.viewCollection = arrFirst;
    // });
  }

  public openNewCollection(element: any): void {
    // console.log('elem: ', this.secondCollection.length, this.thirdCollection.length)
    if (this.secondCollection.length == 0) {
      this.secondElement = element;
      this.secondCollection = element.data;
    }
    else if (this.thirdCollection.length == 0 && this.secondCollection.length > 0) {
      this.thirdElement = element;
      this.thirdCollection = element.data;
    }
    console.log(element)
  }

  public returnBack(): void {
    // this.viewCollection = this.startCollection;
    // this.tempElement = 'Выберите каталог';
  }

  public removeAllCollections(): void {
    this.thirdCollection = [];
    this.thirdElement = [];

    this.secondCollection = [];
    this.secondElement = [];
  }

  public removeThirdCollection(): void {
    this.thirdCollection = [];
    this.thirdElement = [];
  }

  public editSelectedElement(element: any): void {
    this.elementEdit = element;
  }

  public closeEditSelectedElement(elementInput: HTMLInputElement): void {
    if (this.elementEdit) {
      elementInput.value = this.elementEdit.name;
      this.elementEdit = undefined;
    }
  }

  public openFilterEdit(data: any) {
    console.log('open: %c' + data.name, "font-weight: bold; color: red")
    this.router.navigate(['catalogue/edit/'+data.id]).then();
  }
}
