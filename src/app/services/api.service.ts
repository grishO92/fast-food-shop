import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFirestore) {}
  menu: any = [];
  foods: any = [];

  getMenu() {
    return this.db
      .collection('healthy')
      .snapshotChanges()
      .subscribe((res) => {
        res.map((food) => {
          if (this.menu.length < 7) {
            this.menu.push(food.payload.doc.data());
          }
        });
      });
  }
  getFood(id: any) {
    return this.db.doc(`healthy/${id}`).snapshotChanges();
  }

  orderFood(
    name: string,
    address: string,
    city: string,
    country: string,
    menu: any[]
  ) {
    this.db
      .collection('orders')
      .doc('purchased')
      .set({
        name,
        address,
        city,
        country,
        menu,
      })
      .then(() => {
        console.log('Order successful');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
