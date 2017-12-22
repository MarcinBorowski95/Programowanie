import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAppointmentComponent } from './showAppointment.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '' , component: ShowAppointmentComponent}
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
  ],
  declarations: [ShowAppointmentComponent]
})
export class ShowAppointmentModule { }