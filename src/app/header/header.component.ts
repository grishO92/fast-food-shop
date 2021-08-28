import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private cart: CartService
  ) {}
  public faShoppingCart = faShoppingCart;

  public totalItems: number = 0;
  ngOnInit(): void {
    this.cart.getProducts().subscribe((res: any) => {
      this.totalItems = res.length;
    });
  }

  signOut() {
    this.authService.SignOut();
  }
}
