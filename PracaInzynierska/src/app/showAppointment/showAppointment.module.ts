import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAppointmentComponent } from './showAppointment.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes = [
  {path: '' , component: ShowAppointmentComponent}
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [ShowAppointmentComponent]
})
export class ShowAppointmentModule { }