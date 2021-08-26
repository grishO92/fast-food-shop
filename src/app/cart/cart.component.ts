import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private cart: CartService) {}

  public products: any = [];
  public fTotal!: number;
  public fKcal!: number;

  ngOnInit(): void {
    this.cart.getProducts().subscribe((res: any) => {
      this.products = res;
      this.fTotal = this.cart.getTotalPrice();
      this.fKcal = this.cart.getTotalKcal();
    });
  }
  removeQty(item: any) {
    this.cart.removeQuantity(item);
    this.fTotal = this.cart.getTotalPrice();
    this.fKcal = this.cart.getTotalKcal();
  }
  addQty(item: any) {
    this.cart.addQuantity(item);
    this.fTotal = this.cart.getTotalPrice();
    this.fKcal = this.cart.getTotalKcal();
  }
  removeItem(item: any) {
    this.cart.removeCartItem(item);
  }
  emptyCart() {
    this.cart.removeAllCart();
  }
}
