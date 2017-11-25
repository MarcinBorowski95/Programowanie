import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/authentication.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Routing } from "./app.routes";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AngularFireModule} from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAgYADXOrf9p7uFEVE-P2niJ_2qZRtYAkE",
  authDomain: "praca-inzynierska-przychodnia.firebaseapp.com",
  databaseURL: "https://praca-inzynierska-przychodnia.firebaseio.com",
  projectId: "praca-inzynierska-przychodnia",
  storageBucket: "praca-inzynierska-przychodnia.appspot.com",
  messagingSenderId: "221575576836"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AngularFireAuth,
    AngularFireDatabase
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
