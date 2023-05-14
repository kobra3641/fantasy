import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Subscription, switchMap} from "rxjs";
import {ProductService} from "../../core/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionStorageService} from "../../core/services/session.storage.service";
import {tap} from "rxjs/operators";
import {ElasticRequest} from "../../core/models/elastic.request";
import {ElasticResponse} from "../../core/models/elastic.response";
import {CategoryOptionsService} from "../../core/services/categoryOptions.service";
import {CookieService} from "ngx-cookie-service";
import {StorageService} from "../../core/services/storage.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['../product.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {

  private _subscriptions = new Subscription();
  public product: any;
  public inserted: any[] = [];
  public catalogOptions: any[] = [];

  constructor(
    private titleService: Title,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryOptionsService: CategoryOptionsService,
    private cookieService: CookieService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.productService.findById(this.activatedRoute.snapshot.paramMap.get('id'))
        .pipe(
          tap((data: ElasticResponse) =>  this.product = data.hits?.hits[0]._source),
          switchMap((data: ElasticResponse) => this.categoryOptionsService.findOne(data.hits?.hits[0]._source.catalog_id))
        )
        .subscribe({
        next: (data) => {
          this.catalogOptions = data;
          console.log(data);
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          this.titleService.setTitle(this.product.name);
          // this.inserted = this.product.good_data.map((item: any) => {typeof item === 'object'})
          // Object.values(this.product.good_data).map((item: any) => {
          //   if (typeof item === 'object' && item['name'] != 'Не указано') {
          //     this.inserted.push(item['name'])
          //   }
          // });
          // console.log(this.inserted)
        }
      })
    );
    // this.categoryOptionsService.findOne(this.product.catalog_id)


  }

  public getRusName(key: unknown) {
    const keyString:string = String(key);
    const name: any = this.catalogOptions.filter((item) => item.en_name.includes(keyString))[0];
    return name ? name.rus_name : '';
  }

  public getValue(value: unknown) {
    const valueAny: any = value;
    if(valueAny.id)
      return valueAny.name;
    if(valueAny == true)
      return 'Да';
    if(valueAny == false)
      return 'Нет';
    return valueAny;
  }

  public addToCart() {
    const item: any = {
      name: this.product.name,
      price: this.product.price,
      value: 1
    }
    // const element: any = {
    //   items: [] = [item]
    // }
    const currCart: any = this.cookieService.get('cart');
    const cart: any[] = currCart ? JSON.parse(currCart) : [];
    cart.push(item)
    this.cookieService.set('cart', JSON.stringify(cart))
    this.storageService.setGoodsCount(cart.length);
    console.log(this.storageService.goodsCount$.value)
    // this.cookieService.setItem('cart', JSON.stringify(this.product))
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
