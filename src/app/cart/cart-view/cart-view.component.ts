import { Component, OnInit } from '@angular/core';
// import {BaseCookieStorage} from "../../core/services/base-cookie.storage";

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['../cart.component.css']
})
export class CartViewComponent implements OnInit {

  constructor(
    // public baseCookieStorage: BaseCookieStorage
  ) { }

  ngOnInit(): void {
    // this.baseCookieStorage.setItem('key', 'data')
  }

}
