import { AuthService } from './auth.service';
import { Item } from './../_DBModels/Item';
import { Appointment } from './../_DBModels/appointment';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DatabaseService {

  appointments;
  userAppointments;
  users;
  doctors;
  zabiegi;

  constructor(
    private db: AngularFireDatabase,
    private AuthService: AuthService
    ) {
    this.appointments = db.list('appointment').valueChanges();
    this.userAppointments = db.list('appointment', ref => ref.orderByChild('userEmail').equalTo(this.AuthService.currentUserDisplayName)).valueChanges();
    this.users = db.list('users').valueChanges();
    this.doctors = db.list('users', ref => ref.orderByChild('flag').equalTo(1)).valueChanges();
    this.zabiegi = db.list('zabieg').valueChanges();
  }

  getUsers() {
    return this.users;
  }

  getDoctors() {
    return this.doctors;
  }

  getZabiegi() {
    return this.zabiegi;
  }

  getAppointments() {
    return this.appointments;
  }

  newAppointment(appointmentInfo): void {

    const appointmentID = this.db.createPushId()
    const path = `appointment/${appointmentID}`;
    const appointmentRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      date: appointmentInfo.date,
      time: appointmentInfo.time,
      flag: 0,
      zabiegName: appointmentInfo.zabiegName,
      doctorEmail: appointmentInfo.doctorEmail,
      userEmail: ""
    }

    appointmentRef.set(data)
      .catch(error => console.log(error));

  }

  newZabieg(zabiegInfo) {
    const zabiegID = this.db.createPushId()
    const path = `zabieg/${zabiegID}`;
    const zabiegRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      name: zabiegInfo.name,
    }

    zabiegRef.set(data)
      .catch(error => console.log(error));

    alert("Dodano zabieg: " + zabiegInfo.name)
  }
}