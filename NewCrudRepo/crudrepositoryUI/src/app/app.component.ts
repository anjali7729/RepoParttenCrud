import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudrepositoryUI';
  showHead: boolean = false;

  constructor(public _Router: Router) {


    _Router.events.forEach((event) => {
     if (event instanceof NavigationStart) {
       if (event['url'] == '/login' || event['url'] === '/register') {
         this.showHead = false;
       } else {
        
         this.showHead = true;
       }
     }
   });
 }
}
