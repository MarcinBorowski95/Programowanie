import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./login.component";

const routes = [
    {path: '' , component: LoginComponent}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent] ,

})

export default class HomeModule{}