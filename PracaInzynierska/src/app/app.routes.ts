import { AuthGuard } from './_guards/authentication.guard';
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CalendarComponent } from "./calendar/calendar.component";

const routes = [
    {path: "" , loadChildren: 'app/home/home.module#HomeModule', canActivate: [AuthGuard]  } ,
    {path: "login" , loadChildren: 'app/login/login.module'} ,
    {path: "register" , loadChildren: 'app/register/register.module'},
    {path: "calendar" , loadChildren: 'app/calendar/calendar.module', canActivate: [AuthGuard] },
    {path: "profileEdit" , loadChildren: 'app/profileEdit/profileEdit.module#ProfileEditModule', canActivate: [AuthGuard] },
    {path: "addZabieg" , loadChildren: 'app/addZabieg/addZabieg.module#AddZabiegModule', canActivate: [AuthGuard] },
    {path: "showUser" , loadChildren: 'app/showUser/showUser.module#ShowUserModule', canActivate: [AuthGuard] },
    {path: "showAppointment" , loadChildren: 'app/showAppointment/showAppointment.module#ShowAppointmentModule', canActivate: [AuthGuard] },

    {path: "**" , redirectTo: "/" }
    
  ];

  export const Routing = RouterModule.forRoot(routes);