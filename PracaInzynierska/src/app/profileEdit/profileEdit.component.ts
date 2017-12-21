import { DatabaseService } from './../_services/Database.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profileEdit',
  templateUrl: './profileEdit.component.html',
  styleUrls: ['./profileEdit.component.css'],
  providers: [DatabaseService],
})
export class ProfileEditComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dbService: DatabaseService,
    private router: Router
  ) { }

  EditUser: any = {};
  
  users;

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
    this.users = this.dbService.getUsers();
    this.users.subscribe(x => x.forEach(element => {
      console.log(element);
      
      if(this.authService.authState.email == element.email)
      {
        this.EditUser=element
      }
    }));
    
  }

  edit(valid)
  {
    if (valid)
    {
      this.authService.updateUserFullData(this.EditUser); 
      alert("Zmiany zapisane poprawnie")
      this.router.navigate(['/home'])    
    }
    else
    {
      alert("Błędnie uzupełniony formularz")
    }    
  }
}
