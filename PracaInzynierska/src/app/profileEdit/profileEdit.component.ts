import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profileEdit',
  templateUrl: './profileEdit.component.html',
  styleUrls: ['./profileEdit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor() { }

  EditUser: any = {};


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
