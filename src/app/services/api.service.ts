import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFirestore) {}
  menu: any = [];
  getAllFood() {
    this.db
      .collection('healthy')
      .snapshotChanges()
      .subscribe((res) => {
        res.map((food: any) => {
          if (this.menu.length <= 6) {
            this.menu.push(food.payload._delegate.doc.data());
          }
        });
      });
  }
}
