import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  constructor(private api: ApiService, private cart: CartService) {}
  menu: any = [];

  ngOnInit(): void {
    this.api.getMenu();
    this.menu = this.api.menu;
  }

  addToCart(item: any) {
    this.cart.addToCart(item);
  }
}
