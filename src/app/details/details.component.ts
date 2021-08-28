import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  food: any;

  constructor(
    private api: ApiService,
    private cart: CartService,
    private activatedRoute: ActivatedRoute
  ) {
    this.api.getMenu();
  }

  addToCart(item: any): void {
    this.cart.addToCart(item);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.food = this.api.getFood(id).subscribe((food) => {
      this.food = food.payload.data();
    });
  }
}
