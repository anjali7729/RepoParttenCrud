import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServicesService } from '../services/auth-services.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { AlertifyServicesService } from '../services/alertify-services.service';
import { error } from 'alertifyjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup ({
    email : new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(15)])
  });
  constructor(private authservices:AuthServicesService,private route:Router,private alertify:AlertifyServicesService) { }

  ngOnInit() {
  }

  get Email():FormControl
  {
    return this.loginForm.get("email") as FormControl;
  }

  onLogin()
  {
    console.log("login",this.loginForm.value);
    if(this.loginForm.valid)
    {
      this.authservices.login([this.loginForm.value.email,this.loginForm.value.password]).subscribe((res) => 
      {
        if(res == 'Fail')
        {
          this.alertify.Error("User Not Exist");
        }
        else{
          console.log(res);
          this.authservices.setToken(res);
          //localStorage.setItem('userName', res.email);
          this.route.navigateByUrl('home');
          this.alertify.Success("login Successfully");
          //localStorage.setItem('userName',user.userName);
        }
      });
    }
    else{
      this.alertify.Error("something went wrong");
    }
    
  }

}
