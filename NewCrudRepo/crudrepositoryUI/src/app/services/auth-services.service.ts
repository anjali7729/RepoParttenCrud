import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../Model/register';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../Model/login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

currentUser:BehaviorSubject<any> = new BehaviorSubject(null);  
jwtHelperServices = new JwtHelperService();

constructor(private http:HttpClient) { }

baseUrl = "https://localhost:44319/api/Auth/";

register(userReg:Register):Observable<Register>
{
  return this.http.post<Register>(this.baseUrl + 'register',userReg);
}

login(userlog:Array<string>)
{
  return this.http.post(this.baseUrl + 'login',{
    Email : userlog[0],
    Password : userlog[1]
  },{
    responseType : 'text',
  });
}

setToken(token:string)
{
  localStorage.setItem("access_token",token);  
  this.loadCurrentUser();
}

// loadCurrentUser()
// {
//   const token = localStorage.getItem("access_token");
//   const userInfo = token != null? this.jwtHelperServices.decodeToken(token) : null;

//   if(userInfo)
//   {
//     const data = userInfo ? {
//       id:userInfo.id,
//       firstname:userInfo.firstname,
//       lastname:userInfo.lastname,
//       email:userInfo.email,
//       mobile:userInfo.mobile,
//       gender:userInfo.gender
//     } : null;
//     localStorage.setItem("currentUser", JSON.stringify(data));
//     this.currentUser.next(data);
//     //console.log(userInfo);
//   }
// }

loadCurrentUser() {
  const token = localStorage.getItem("access_token");
  const userInfo = token != null ? this.jwtHelperServices.decodeToken(token) : null;
  const data = userInfo
    ? {
        id: userInfo.id,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email: userInfo.email,
        mobile: userInfo.mobile,
        gender: userInfo.gender
      }
    : null;
  this.currentUser.next(data);

  // You can also set the user's first name in localStorage
  if (data) {
    localStorage.setItem("firstName", data.firstname);
  }
}


isLoggedin():boolean{
  return localStorage.getItem("access_token") ? true:false;
}

removeToken()
{
  localStorage.removeItem("access_token");
}

// getFirstName(): string | null {
//   const currentUser = this.currentUser.getValue();
//   return currentUser ? currentUser.firstname : null;
// }

getFirstName(): string | null {
  const currentUser = this.currentUser.getValue();
  return currentUser ? currentUser.firstname : null;
}

}
