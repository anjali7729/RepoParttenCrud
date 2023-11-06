import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../services/auth-services.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggeduser? : string | null;
  firstName?: string | null;


  constructor(private auth:AuthServicesService,private route:Router) {
    this.updateUser();
   }

  ngOnInit() {
  }

  logout()
  {
    this.auth.removeToken();
    this.route.navigateByUrl('/login');

  }
  isLoggin()
  {
    this.loggeduser = localStorage.getItem("access_token");
    return this.loggeduser;
  }

  // updateUser() {
  //   // Retrieve user data, including first name, from localStorage
  //   const currentUserData = localStorage.getItem("currentUser");
  //   if (currentUserData) {
  //     const currentUser = JSON.parse(currentUserData);
  //     this.firstName = currentUser.firstname;
  //   }
  // }

  updateUser() {
    this.firstName = this.auth.getFirstName(); // Get the user's first name
  }

}
