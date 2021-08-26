import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList: any = new BehaviorSubject<any>([]);

  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addToCart(product: any) {
    if (!this.cartItemList.includes(product)) {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      this.getTotalKcal();
    } else {
      this.removeCartItem(product);
    }
  }

  addQuantity(product: any) {
    if (product.quantity >= 1) {
      product.quantity += 1;
    }
  }
  removeQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      this.removeCartItem(product);
    }
  }

  getTotalPrice(): number {
    let fTotal = 0;
    this.cartItemList.map((i: any) => {
      fTotal += i.quantity * i.price;
    });
    return fTotal;
  }
  getTotalKcal(): number {
    let fKcal = 0;
    this.cartItemList.map((i: any) => {
      fKcal += i.quantity * i.calories;
    });
    return fKcal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((i: any, index: number) => {
      if (product.id == i.id) {
        product.quantity = 1;
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
