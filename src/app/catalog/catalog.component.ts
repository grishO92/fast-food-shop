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
  }

  addToCart(item: any) {
    this.cart.addToCart(item);
  }
}
