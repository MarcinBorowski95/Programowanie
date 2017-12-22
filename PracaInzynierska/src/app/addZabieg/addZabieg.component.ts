import { Router } from '@angular/router';
import { DatabaseService } from './../_services/Database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addZabieg',
  templateUrl: './addZabieg.component.html',
  styleUrls: ['./addZabieg.component.css'],
  providers: [DatabaseService]
})
export class AddZabiegComponent implements OnInit {

  constructor(
    private dbService: DatabaseService,
    private router: Router
  ) { }

  zabieg: any = {};

  ngOnInit() {
  }

  addZabieg(valid)
  {
    if(valid)
    {
      this.dbService.newZabieg(this.zabieg)
      this.router.navigate(['/'])
    }
  }
}
