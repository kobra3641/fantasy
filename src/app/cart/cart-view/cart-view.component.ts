import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['../cart.component.css']
})
export class CartViewComponent implements OnInit {

  public products: any;
  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.products = JSON.parse(this.cookieService.get('cart') ? this.cookieService.get('cart') : '[]');
    console.log(this.products)
  }

}
