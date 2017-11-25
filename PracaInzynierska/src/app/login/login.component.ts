import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFireDatabase
  ]
})
export class LoginComponent implements OnInit {

  @ViewChild('formRef') formLog;

  loginUser: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    
  }

  login(valid)
  {
    if(valid)
    {
      this.auth.emailLogin(this.loginUser);
    }
    else
    {
      console.log("Error");
      alert("Błędnie podane hasło lub E-mail");
    }
  }

}
