import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import * as alertify from 'alertifyjs';
import { AlertifyServicesService } from '../services/alertify-services.service';
import { Product } from '../Model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product:Product[] = [];

  constructor(private proservices:ProductService,private alertify:AlertifyServicesService) 
  { 
    this.getAllProduct();
  }

  image:string = this.proservices.imageUrl;

  ngOnInit() {
  }

  getAllProduct()
  {
    this.proservices.getAllProduct().subscribe(
      (res) => {
        console.log(res);
        this.product = res;
      });
  }
}
