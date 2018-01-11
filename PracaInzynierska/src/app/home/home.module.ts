import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from '../register/register.component';

import { SlideshowModule } from 'ng-slideshow';

const routes = [
    { path: '', component: HomeComponent },

]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SlideshowModule,

    ],
    declarations: [HomeComponent],

})

export class HomeModule { }