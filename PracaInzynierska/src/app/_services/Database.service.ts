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

  appointments: Observable<any>;
  users: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.appointments = db.list('appointment').valueChanges();
    this.users = db.list('users').valueChanges();
  }

  newAppointment(appointmentInfo): void {

    const appointmentID = this.db.createPushId()
    const path = `appointment/${appointmentID}`;
    const appointmentRef: AngularFireObject<any> = this.db.object(path);
    
    const data = {
      date: appointmentInfo.date,
      time: appointmentInfo.time,
      flag: 0
    }
    
    appointmentRef.set(data)
      .catch(error => console.log(error));
    
  }
}