import { DatabaseService } from './../_services/Database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showUser',
  templateUrl: './showUser.component.html',
  styleUrls: ['./showUser.component.css'],
  providers: [DatabaseService]
})
export class ShowUserComponent implements OnInit {

  constructor(
    private dbService: DatabaseService
  ) { }

  users;
  flag;

  ngOnInit() {
    this.users = this.dbService.getUsers();
  }

  changeFlag(user)
  {
    this.dbService.updateUser(user.key, user.flag)
  }
}
