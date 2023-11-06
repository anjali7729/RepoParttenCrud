import { Component, OnInit } from '@angular/core';
import { Register } from '../Model/register';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';
import * as alertify from 'alertifyjs';
import { AlertifyServicesService } from '../services/alertify-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  repeatPass:string = 'none';

  constructor(private route:Router,private authservices:AuthServicesService,private alertify:AlertifyServicesService) { }

  ngOnInit() {
  }


    registrationForm:FormGroup = new FormGroup({
      firstName : new FormControl(null,[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
      lastName : new FormControl(null,[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
      password : new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(15)]),
      rpassword:new FormControl(null,[Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email : new FormControl(null,[Validators.required,Validators.email]),
      gender:new FormControl(null,[Validators.required])
    })


  onSubmit()
  {
    console.log("reg",this.registrationForm.value);

    if((this.Password.value == this.RPassword.value) && this.registrationForm.valid)
    {
      this.authservices.register(this.registrationForm.value).subscribe((res) => 
      {

          console.log(res);
          this.route.navigateByUrl('login');
          this.alertify.Success('Successfully Register');
      })
    }
    else
    {
      this.alertify.Error("Something went wrong");
    }
  }

  get FirstName():FormControl
  {
    return this.registrationForm.get('firstName') as FormControl;
  }
  get LastName():FormControl
  {
    return this.registrationForm.get('lastName') as FormControl;
  }  
  get Password():FormControl
  {
    return this.registrationForm.get('password') as FormControl;
  } 
   get RPassword():FormControl
  {
    return this.registrationForm.get('rpassword') as FormControl;
  }  
  get PhoneNumber():FormControl
  {
    return this.registrationForm.get('phoneNumber') as FormControl;
  }
  get Email():FormControl
  {
    return this.registrationForm.get('email') as FormControl;
  }  
  get Gender():FormControl
  {
    return this.registrationForm.get('gender') as FormControl;
  }

}
