import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profileEdit.component';
import { FormsModule } from '@angular/forms';

const routes = [
  {path: '' , component: ProfileEditComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [ProfileEditComponent]
})
export class ProfileEditModule { }