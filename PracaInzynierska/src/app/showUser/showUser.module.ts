import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowUserComponent } from './showUser.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '' , component: ShowUserComponent}
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [ShowUserComponent]
})
export class ShowUserModule { }