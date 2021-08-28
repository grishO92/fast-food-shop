import { Injectable } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  /* Sign up */
  async SignUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.router.navigate(['/catalog']);
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  /* Sign in */
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.router.navigate(['/catalog']);
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  /* Sign out */
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('userData');
    this.router.navigate(['']);
    this.userData = false;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
