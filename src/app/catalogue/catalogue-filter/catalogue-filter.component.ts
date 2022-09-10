import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CatalogOption} from "../models/catalog.option";
import {ClassifierService} from "../../core/services/classifier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../core/services/common.service";
import {Classifier} from "../../core/models/classifier";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-catalogue-filter',
  templateUrl: './catalogue-filter.component.html',
  styleUrls: ['../catalogue.component.css']
})
export class CatalogueFilterComponent implements OnInit {

  @Input() catalogOptions: CatalogOption[] = [];
  @Input() aggregations: any;
  @Output() queryParams = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef,
    private classifierService: ClassifierService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.initHoldAggregation();
    this.initCatalogOptionClassifiers(this.catalogOptions);
  }

  private initHoldAggregation() {
    if(localStorage.getItem('holdAggregation')) {
      const holdAggregation: any = JSON.parse(<string>localStorage.getItem('holdAggregation'));
      this.aggregations[holdAggregation.optionName] = holdAggregation.aggregation;
    }
  }

  private initCatalogOptionClassifiers(catalogOptions: CatalogOption[]): void {
    this.catalogOptions = catalogOptions.map((catalogOption: CatalogOption) => {
      if (catalogOption.type == 'array')
        this.initClassifiersByTypeArray(catalogOption);
      if (catalogOption.type == 'boolean') {
        const booleanClassifier: any[] = [{name: 'Да', value: 'true'}, {name: 'Нет', value: 'false'}];
        catalogOption['data'] = this.initClassifiers(booleanClassifier, catalogOption, true);
      }
      return catalogOption;
    });
  }

  private initClassifiersByTypeArray(catalogOption: CatalogOption): void {
    const query: any = {columns: '*', nameTable: catalogOption.source};
    const sub: Subscription = this.classifierService.findOne(query)
      .subscribe(
        (classifiers: Classifier[]) => {
          catalogOption['data'] = this.initClassifiers(classifiers, catalogOption, false);
        },
        (error) => {console.log(error)},
        () => {
          sub.unsubscribe();
        }
      )
  }

  private initClassifiers(classifiers: any[], catalogOption: CatalogOption, isPrimitiveType: boolean): any[] {
    let buckets: any;
    if(catalogOption.name)
      buckets = this.aggregations[catalogOption.name]?.buckets;
    for(let classifier of classifiers) {
      let count: any;
      if(isPrimitiveType)
        count = buckets.find((lockItem: any) => classifier.value == lockItem.key_as_string);
      else
        count = buckets.find((lockItem: any) => classifier.id == lockItem.key);
      if(count && count.doc_count)
        classifier['count'] = count.doc_count;
      this.initActivity(catalogOption, classifier);
    }
    return classifiers;
  }

  private initActivity(catalogOption: CatalogOption, classifier: any) {
    classifier['active'] = false;
    let queryParam: any[] = [];
    if(!this.commonService.isEmptyObject(this.activatedRoute.snapshot.queryParams) &&
      catalogOption.name &&
      this.activatedRoute.snapshot.queryParams[catalogOption.name]) {
      queryParam = this.activatedRoute.snapshot.queryParams[catalogOption.name].split('_');
    }
    if(queryParam.find((item) => item == (classifier.name))) {
      classifier.active = true;
    }
  }

  public showMore(event: any, option: any): void {
    this.elementRef.nativeElement.querySelectorAll('#' + event.name)
      .forEach((item: any, index: number) => {
        if (index >= 5)
          if (item.classList.contains('hidden')) {
            item.classList.remove('hidden');
            item.classList.add('show');
          }
          else if (item.classList.contains('show')) {
            item.classList.remove('show');
            item.classList.add('hidden');
          }
      })
    if (option.textContent.trim() == 'Показать еще')
      option.textContent = 'Скрыть';
    else
      option.textContent = 'Показать еще';
  }

  public prepareOptionValueName(optionValue: any): any {
    if (optionValue.count)
      return optionValue.name + ' (' + optionValue.count + ')'
    return optionValue.name
  }

  public setQueryParams(catalogOption: any, optionValue: any) {
    this.queryParams.emit({optionName: catalogOption.name, optionValue: optionValue.name});
    if(!localStorage.getItem('holdAggregation')) {
      const local = JSON.stringify({optionName: catalogOption.name, aggregation: this.aggregations[catalogOption.name]})
      localStorage.setItem('holdAggregation', local);
    }
  }

}
