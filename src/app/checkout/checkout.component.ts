import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public fTotal!: number;
  public fKcal!: number;
  public products: any = [];

  constructor(private api: ApiService, private cart: CartService) {}

  ngOnInit(): void {
    this.cart.getProducts().subscribe((res: any) => {
      this.products = res;
      this.fTotal = this.cart.getTotalPrice();
      this.fKcal = this.cart.getTotalKcal();
    });
  }
  order(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.api.orderFood(
      form.controls.name.value,
      form.controls.adress.value,
      form.controls.city.value,
      form.controls.country.value,
      this.api.menu
    );

    form.reset();
  }
}
