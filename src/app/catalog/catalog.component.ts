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
  public allFood: any;

  ngOnInit(): void {
    this.api.getAllFood();
    this.allFood = this.api.menu;

    this.allFood.forEach((i: any) => {
      Object.assign(i, { quantity: 1, total: i.price });
    });
  }

  addToCart(item: any) {
    this.cart.addToCart(item);
  }
}
