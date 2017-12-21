import { DatabaseService } from './../_services/Database.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Immutable from 'immutable'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
    DatabaseService,
  ]
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService, 
    private dbSevice: DatabaseService,
    private router: Router) {
  }
  
  view: number = 0;
  user

  options = Immutable.Map({
    showDots: true,         // Shows a dot navigation component 
    height: 450,            // The initial slideshow height 
    showThumbnails: false,   // Optionally include thumbnails a navigation option 
    thumbnailWidth: 150     // Thumbnail individual width for the thumbnail navigation component 
  });

  images = Immutable.List([
    {
      url: 'https://www.cmryska.pl/wp-content/uploads/2015/04/CM-Ryska-przychodnia-rodzinna-lekarz-poz-pediatra-1024x461.jpg'
    },
    {url: 'http://przychodnia-zdrowie.com.pl/sites/default/files/rec.jpg'},
    {url: 'https://multimed.pl/wp-content/uploads/2015/08/multimed-warszawa-okopowa-06.jpg'},
    {url: 'http://krajmed.pl/wp-content/uploads/2015/08/top_przychodnia.jpg'},
    {url: 'http://formmed.com.pl/wp-content/uploads/2014/05/p1-formmed_przychodnia.jpg'},
    {url: 'http://www.um.warszawa.pl/sites/default/files/imagecache/Lightbox_o_max_szerokosci_980px/ilustracje/aktualnosci/dsc_7686.jpg'},
    {url: 'http://www.bio-medical.btest.pl/wp-content/uploads/2016/08/cropped-Fotolia_65704515_Subscription_Monthly_XXL.jpg'},
  ]);

  ngOnInit() {
    if(this.authService.authenticated)
    {
      console.log("Zalogowany");
      console.log(this.authService.currentUserDisplayName);
    }
    else
    {
      console.log("Brak zalogowanego użytkownika")
    }
  }
  
  logout() {
    alert("Zostałeś wylogowany");
    this.authService.signOut();
  }
}