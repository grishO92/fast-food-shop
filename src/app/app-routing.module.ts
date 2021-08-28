import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('login');
const redirectLoggedInToCatalog = () => redirectLoggedInTo('catalog');

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToCatalog },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToCatalog },
  },
  {
    path: 'catalog',
    children: [
      {
        path: '',
        component: CatalogComponent,
      },
      {
        path: ':id',
        component: DetailsComponent,
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
    ],
  },

  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
