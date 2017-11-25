import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
  ]
})
export class RegisterComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  registerUser: any = {};

  constructor(
    private router: Router,
    private auth: AuthService,
    private db: AngularFireDatabase,
  ) {
    this.itemRef = db.object('item');
  }

  register(valid)
  {
    if (valid)
    {
      this.auth.emailSignUp(this.registerUser);
      
    }
    else
    {
      alert("Błędnie uzupełniony formularz")
    }    
  }

  getMaxDate()
  {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear()-18;

    var yearstr = year.toString();
    var daystr = day.toString();
    var monthstr = day.toString();

    if (day < 10) {
      daystr = "0"+day;
    }
    if (month < 10) {
      monthstr = "0"+month;
    }

    var finalDate = yearstr + "-" + monthstr + "-" + daystr;

    return finalDate;
  }

  getMinDate()
  {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear() - 120;

    var yearstr = year.toString();
    var daystr = day.toString();
    var monthstr = day.toString();

    if (day < 10) {
      daystr = "0"+day;
    }
    if (month < 10) {
      monthstr = "0"+month;
    }

    var finalDate = yearstr + "-" + monthstr + "-" + daystr;

    return finalDate;
  }

  ngOnInit() {
    document.getElementById('birthdate').setAttribute('max' , this.getMaxDate() );
    document.getElementById('birthdate').setAttribute('min' , this.getMinDate() );

    
  }

}
