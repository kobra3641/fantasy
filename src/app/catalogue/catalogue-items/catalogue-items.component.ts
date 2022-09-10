import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hit} from "../../core/models/elastic.response";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-catalogue-items',
  templateUrl: './catalogue-items.component.html',
  styleUrls: ['../catalogue.component.css']
})
export class CatalogueItemsComponent implements OnInit {

  @Input() count: any;
  @Input() goods: Hit[] = [];
  @Output() queryParams = new EventEmitter<any>();
  public ratingArrow: boolean = true;
  public ratingSelect: any;
  public goodsView: string | null | undefined;
  public page: any = 1;
  public sortingElements: any[] = [
    {name: 'Цена по возрастанию', value: 'asc'},
    {name: 'Цена по убыванию', value: 'desc'},
    {name: 'Рекомендуем', value: 'recommend'},
    {name: 'Рейтинг', value: 'rate'}
  ];

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (this.activatedRoute.snapshot.queryParamMap.get('page'))
      this.page = this.activatedRoute.snapshot.queryParamMap.get('page');
    if (localStorage.getItem('goodsView'))
      this.goodsView = localStorage.getItem('goodsView');
    else
      this.goodsView = 'list';
    if (localStorage.getItem('goodsSort'))
      this.ratingSelect = localStorage.getItem('goodsSort');
    else
      this.ratingSelect = 'Рекомендуем';
  }

  public changeToggleGroup(value: any): void {
    this.goodsView = value;
    localStorage.setItem('goodsView', value);
  }

  public ratingSort(event: any): void {
    this.ratingSelect = event.title;
    localStorage.setItem('goodsSort', event.title);
    this.queryParams.emit({optionName: 'sort', optionValue: event.value})
  }

  public handlePageChange(event: any) {
    this.page = event;
    this.queryParams.emit({optionName: 'page', optionValue: event})
  }

}
