import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFirestore) {}
  array: any = [];
  getAllFood() {
    return this.db
      .collection('healthy')
      .snapshotChanges()
      .subscribe((res) => {
        res.map((food: any) => {
          this.array.push(food.payload._delegate.doc.data());
        });
      });
  }
}
