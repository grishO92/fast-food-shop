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

  ngOnInit(): void {
    this.cart.getProducts().subscribe((res: any) => {
      this.products = res;
      this.fTotal = this.cart.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cart.removeCartItem(item);
  }
  emptyCart() {
    this.cart.removeAllCart();
  }
}
