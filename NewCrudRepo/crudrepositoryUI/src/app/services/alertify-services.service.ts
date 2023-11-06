import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs'; 

@Injectable({
  providedIn: 'root'
})
export class AlertifyServicesService {

constructor() { }

Success(message:string)
{
  alertify.success(message);
}
Warning(message:string)
{
  alertify.warning(message);
}
Error(message:string)
{
  alertify.error(message);
}

}
