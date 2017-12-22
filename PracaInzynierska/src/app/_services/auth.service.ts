import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


// export function createListValueChanges<T>(query: DatabaseQuery) {
//   return function valueChanges<T>(events?: ChildEvent[]): Observable<T[]> {
//     events = validateEventsArray(events);
//     return listChanges<T>(query, events!)
//       .map(changes => changes.map(change => { 
//         console.log(changes)
//         const data = change.payload.snapshot!.val()
//         return  { $key: change.key, ...data }
//       }))
//   }
// }


@Injectable()
export class AuthService {

  authState: any = null;
  userRef: AngularFireObject<any>; 

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) 
  {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      if(auth)
      {
      }
    });

  }

  get authenticated$(): Observable<boolean> {
    return this.afAuth.authState.map((user) => !!user);
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState
    
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }


  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else {
      return this.authState['email'] || 'User without a Name'
    }
  }

  emailSignUp(userInfo: any) {
    const fbAuth = firebase.auth();
    return this.afAuth.auth.setPersistence("local")
    .then(() => {
      this.afAuth.auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((user) => {
        this.authState = user;
        this.updateUserFullData(userInfo);
        this.router.navigate(['']);
      })
      .catch(error => {
        alert("Email jest już używany przez inną osobę");
        console.log(error)
      });
    });
  }

  emailLogin(userInfo: any) {
    return this.afAuth.auth.setPersistence("local")
    .then(() => {this.afAuth.auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
        this.router.navigate(['']);
      })
      .catch(error => {
        alert("Użytkownik o podanym adresie E-mail nie istnieje lub podane hasło jest blędne");
        console.log(error)
      });
    });
  }

  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }


  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login'])
    console.log("Wylogowanie");
  }


  private updateUserData(): void {
    const path = `users/${this.currentUserId}`; 
    const userRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      email: this.authState.email,
      name: this.authState.displayName,
    }

    userRef.update(data)
      .catch(error => console.log(error));

  }

  updateUserFullData(userInfo): void {
    const path = `users/${this.currentUserId}`;
    const userRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      firstname: userInfo.firstname ,
      lastname: userInfo.lastname ,
      birthdate: userInfo.birthdate ,
      sex: userInfo.sex ,
      email: userInfo.email,
      password: userInfo.password,
      flag: 0
    }

    userRef.set(data)
      .catch(error => console.log(error));

  }


}