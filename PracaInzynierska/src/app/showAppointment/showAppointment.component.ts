import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/Database.service';

@Component({
  selector: 'app-showAppointment',
  templateUrl: './showAppointment.component.html',
  styleUrls: ['./showAppointment.component.css'],
  providers: [DatabaseService]
})
export class ShowAppointmentComponent implements OnInit {

  constructor(
    private dbService: DatabaseService
  ) { }

  appointments

  ngOnInit() {
    this.appointments = this.dbService.getAppointments()
    
  }

}
