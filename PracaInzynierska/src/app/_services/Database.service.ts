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

  appointmentsRef: AngularFireList<any>;
  userAppointmentsRef: AngularFireList<any>;
  usersRef: AngularFireList<any>;
  doctorsRef: AngularFireList<any>;
  zabiegiRef: AngularFireList<any>;

  appointments: Observable<any[]>;
  userAppointments: Observable<any[]>;
  users: Observable<any[]>;
  userstest;
  doctors: Observable<any[]>;
  zabiegi: Observable<any[]>;


  constructor(
    private db: AngularFireDatabase,
    private AuthService: AuthService
  ) {
    this.appointmentsRef = db.list('appointment');
    this.userAppointmentsRef = db.list('appointment', ref => ref.orderByChild('doctorEmail').equalTo(this.AuthService.currentUserDisplayName));
    this.usersRef = db.list('users');
    this.doctorsRef = db.list('users', ref => ref.orderByChild('flag').equalTo(1));
    this.zabiegiRef = db.list('zabieg');

    this.appointments = this.appointmentsRef.snapshotChanges().map(this.getFullData);
    this.userAppointments = this.userAppointmentsRef.snapshotChanges().map(this.getFullData);
    this.users = this.usersRef.snapshotChanges().map(this.getFullData);
    this.doctors = this.doctorsRef.snapshotChanges().map(this.getFullData);
    this.zabiegi = this.zabiegiRef.snapshotChanges().map(this.getFullData);

  }

  getUsers() {
    return this.users;
  }
  addUser(newName: string) {
    this.usersRef.push({ text: newName });
  }
  updateUser(key: string, flag: number) {
    if (flag==0) {
      this.usersRef.update(key, { flag: 0 });
    } else if (flag==1) {
      this.usersRef.update(key, { flag: 1 });
    } else if (flag==2) {
      this.usersRef.update(key, { flag: 2 });
    } else {
      this.usersRef.update(key, { flag: 3 });
    }
  }
  deleteUser(key: string) {
    this.usersRef.remove(key);
  }
  deleteEverythingUser() {
    this.usersRef.remove();
  }

  getDoctors() {
    return this.doctors;
  }

  getZabiegi() {
    return this.zabiegi;
  }
  addZabieg(newName: string) {
    this.zabiegiRef.push({ text: newName });
  }
  updateZabieg(key: string, newText: string) {
    this.zabiegiRef.update(key, { text: newText });
  }
  deleteZabieg(key: string) {
    this.zabiegiRef.remove(key);
  }
  deleteEverythingZabieg() {
    this.zabiegiRef.remove();
  }

  getAppointments() {
    return this.appointments;
  }
  addAppointment(newName: string) {
    this.appointmentsRef.push({ text: newName });
  }
  updateAppointment(key: string, newText: string) {
    if (newText == "") {
      this.appointmentsRef.update(key, { userEmail: newText, flag: 0 });
    } else {
      this.appointmentsRef.update(key, { userEmail: newText, flag: 1 });
    }
  }
  acceptAppointment(key: string) {
    this.appointmentsRef.update(key, { flag: 2 });
  }
  deleteAppointment(key: string) {
    this.appointmentsRef.remove(key);
  }
  deleteEverythingAppointment() {
    this.appointmentsRef.remove();
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

  getFullData(changes) {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  }
}