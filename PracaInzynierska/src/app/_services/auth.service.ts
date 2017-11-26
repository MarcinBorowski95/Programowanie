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
        console.log(auth);
      }
    });

  }

  // Returns true if user is logged in
  get authenticated$(): Observable<boolean> {
    return this.afAuth.authState.map((user) => !!user);
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
    
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else if (this.currentUserAnonymous) {
      return 'Anonymous'
    } else {
      return this.authState['email'] || 'User without a Name'
    }
  }

  //// Social Auth ////
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
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

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login'])
    console.log("Wylogowanie");
  }


  //// Helpers ////
  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      email: this.authState.email,
      name: this.authState.displayName,
    }

    userRef.update(data)
      .catch(error => console.log(error));

  }

  private updateUserFullData(userInfo): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      firstname: userInfo.firstname ,
      lastname: userInfo.lastname ,
      birthdate: userInfo.birthdate ,
      sex: userInfo.sex ,
      email: userInfo.email,
      password: userInfo.password
    }

    console.log(userInfo);
    console.log(data);

    userRef.set(data)
      .catch(error => console.log(error));

  }


}