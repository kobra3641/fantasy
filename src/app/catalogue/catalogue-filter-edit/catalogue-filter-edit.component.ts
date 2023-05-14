import {Component, OnInit} from '@angular/core';
import {CategoryOptionsService} from "../../core/services/categoryOptions.service";
import {CatalogOption} from "../models/catalog.option";
import {Subscription} from "rxjs";
import {_catalogOptionTypes, _numberTypes, _textTypes, CatalogOptionTypeEnum} from "../models/catalog.option.type.enum";
import {ClassifierService} from "../../core/services/classifier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import {Catalog} from "../models/catalog";

@Component({
  selector: 'app-catalogue-filter-edit',
  templateUrl: './catalogue-filter-edit.component.html',
  styleUrls: ['./catalogue-filter-edit.component.css']
})
export class CatalogueFilterEditComponent implements OnInit {

  public catalogOptions: any[] = [];
  public currentCatalogOptions: any[] = [];
  public types: any[] = _catalogOptionTypes;
  public numberTypes: string[] = _numberTypes;
  public textTypes: string[] = _textTypes;
  public currentType: CatalogOptionTypeEnum;
  public CatalogOptionTypeEnum = CatalogOptionTypeEnum;
  public schemaAndTableNames: any[] = [];
  public tableNames: any[] = [];
  public isAdding: boolean = false;
  public currentCatalogOption: any;
  public currentSchema: any;
  public currentTable: string;
  public catalog: Catalog;

  constructor(
    private categoryOptionsService: CategoryOptionsService,
    private classifierService: ClassifierService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initCatalog();
    this.initCatalogOptions();
    this.initArrayTypeData();
  }

  private initCatalog() {
    const catalog: Subscription = this.categoryService.findById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
      next: (data) => {
        this.catalog = data;
      },
      complete: () => {
        catalog.unsubscribe();
      }
    })
  }

  public addOption(): void {
    this.isAdding = true;
  }

  private initCatalogOptions() {
    const findOne: Subscription = this.categoryOptionsService.findOne(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
      next: (catalogOptions: CatalogOption[]) => {
        this.catalogOptions = catalogOptions.map((item) => {
          return {viewValue: item.rus_name, value: item.id}
        });
      },
      complete: () => {
        findOne.unsubscribe();
      }
    })
    const findAll: Subscription = this.categoryOptionsService.findAll().subscribe({
      next: (options: any) => {
        this.currentCatalogOptions = options.map((item: any) => {
          return {viewValue: item.rus_name, value: item.id}
        });
      },
      complete: () => {
        findAll.unsubscribe();
      }
    })
  }

  private initArrayTypeData() {
    const findForArrayType = this.classifierService.findSchemaNameAndTableNames().subscribe({
      next: (data: any[]) => {
        this.schemaAndTableNames = data;
      },
      complete: () => {
        findForArrayType.unsubscribe();
      }
    });
  }

  public changeElement(catalogOption: any): void {
    this.currentCatalogOption = catalogOption;
  }

  public changeEnumType(type: string): CatalogOptionTypeEnum {
    const en: CatalogOptionTypeEnum = (<any>CatalogOptionTypeEnum)[type];
    return en;
  }

  public changeSchema(schema: any): void {
    this.currentSchema = schema.viewValue;
    this.tableNames = schema.value.map((table: string) => {
      return {viewValue: table, value: table};
    });
  }

  public changeTable(table: any) {
    this.currentTable = table.value;
  }

  public changeType(type: any) {
    this.currentType = type.value;
  }

  public save(): void {
    const schema_name: string = this.currentType === 'array' ? this.currentSchema : 'public';
    const table_name: string = this.currentType === 'boolean' ? 'boolean' : this.currentTable;
    const newOptionToCatalog: any = {
      categoryId: this.activatedRoute.snapshot.paramMap.get('id'),
      optionId: this.currentCatalogOption.value,
      type: this.currentType,
      schema_name,
      table_name
    }
    this.categoryOptionsService.save(newOptionToCatalog).subscribe(data => console.log(data));
    console.log('newOptionToCatalog',newOptionToCatalog);
  }

  public removeChip(catalogOption: any) {

    this.catalogOptions = this.catalogOptions.filter(item => item.viewValue != catalogOption.viewValue)
    console.log(catalogOption)
  }

  returnBack() {
    this.router.navigate(['catalogue/edit']).then();
  }


}
