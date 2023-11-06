import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/Product';
import { ProductService } from '../product.service';
import * as alertify from 'alertifyjs';
import { AlertifyServicesService } from '../services/alertify-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

 productId!: number;
 public mainPhotoUrl: string = '';

 ProductDetails: Product ={
  id:null,
  name:'',
  description:'',
  price:undefined,
  cateName:'',
  brandName:'',
  image:'',
  profile:''
}


constructor(private proServices:ProductService,private alertyfy:AlertifyServicesService,private route:Router,private active:ActivatedRoute) { }

image:string = this.proServices.imageUrl;

  ngOnInit() {
    this.active.paramMap.subscribe((res) =>
    {
      console.log(res);
      const id = res.get('id');

      if(id)
      {
        this.proServices.getProduct(id).subscribe(
          (res) => {
            this.ProductDetails = res;
          }
        )
      }
    });
  }

  onDelete()
  {
    if(this.ProductDetails.id !== null)
    {
      this.proServices.deleteProduct(this.ProductDetails.id).subscribe(
        (res) => {
          console.log(res);
          this.route.navigateByUrl('home');
          this.alertyfy.Error("Recored is Deleted.");
        });
    }
  }


}
