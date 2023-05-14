import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Hit} from "../../core/models/elastic.response";
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../models/item";
import {QueryParamItem} from "../models/query.param.item";
import {QueryParametersService} from "../../core/services/query.parameters.service";

@Component({
  selector: 'app-catalogue-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalogue-items.component.html',
  styleUrls: ['../catalogue.component.css']
})
export class CatalogueItemsComponent implements OnChanges {

  @Input() item: Item;
  public page: number = 1;
  public pages: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private queryParamsService: QueryParametersService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.init(this.item.count);
  }

  private init(count: number): void {
    this.pages = Math.ceil(count / 30);
    if (this.activatedRoute.snapshot.queryParamMap.get('page'))
      this.page = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
  }

  public handlePageChange(page: number): void {
    this.page = page;
    const queryParamItem: QueryParamItem = {property: 'page', value: page};
    const queryParams: Record<any, any> = this.queryParamsService.updateQueryParams(this.activatedRoute.snapshot.queryParams, queryParamItem);
    this.router.navigate([], {queryParams}).then();
  }

  public openGood(element: Hit): void {
    this.router.navigate(['product/' + element._id]).then();
  }

}
