import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddZabiegComponent } from './addZabieg.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '' , component: AddZabiegComponent},
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [AddZabiegComponent]
})
export class AddZabiegModule { }