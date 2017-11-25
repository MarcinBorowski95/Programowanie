import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RegisterComponent } from "./register.component";

const routes = [
    {path: '' , component: RegisterComponent}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [RegisterComponent] ,

})

export default class HomeModule{}