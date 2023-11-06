import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Model/Product';
import * as alertify from 'alertifyjs';
import { AlertifyServicesService } from '../services/alertify-services.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../Model/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private alertify:AlertifyServicesService,private route:Router,private proservices:ProductService,private cateservices:CategoryService) {
    this.getCategory();
   }
   category:Category[] = []

  ValidForm:FormGroup = new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(20),Validators.pattern("[a-zA-Z].*")]),
    price:new FormControl("",[Validators.required,Validators.pattern("[0-9]*")]),
    description:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
    brandName:new FormControl("",[Validators.required]),
    cateName:new FormControl("",[Validators.required]),
    profile:new FormControl('doremi.jpg'),
    image:new FormControl()
  });

  get Name(): FormControl
  {
    return this.ValidForm.get('name') as FormControl;
  }

  get Price(): FormControl
  {
    return this.ValidForm.get('price') as FormControl;
  }

  get Description(): FormControl
  {
    return this.ValidForm.get('description') as FormControl;
  }

  get CateName(): FormControl
  {
    return this.ValidForm.get('cateName') as FormControl;
  }

  get BrandName(): FormControl
  {
    return this.ValidForm.get('brandName') as FormControl;
  }

  get Profile():FormControl
  {
    return this.ValidForm.get('profile') as FormControl;
  }

  ngOnInit() {
  }

  addProductRequest: Product ={
    id:null,
    name:'',
    description:'',
    price:undefined,
    cateName:'',
    brandName:'',
    image:'',
    profile:''
}

formData:any={}
fileData:any = null;
profile?:string;
image:string = this.proservices.imageUrl;

handleUpload(event:any)
{
  this.fileData = event.target.files[0];
  console.log(this.fileData);
  this.profile = event.target.files[0].name;
  this.fileData.set('Image',this.fileData);
}
  addProduct()
  {
    console.log("form",this.ValidForm.value);
    console.log("formcheck",this.ValidForm.valid);

    if(this.ValidForm.valid)
    {
      const ProData = this.ValidForm.value;
      console.log(ProData);

      const formData = new FormData();
      formData.append('id','0');
      formData.append('name',ProData.name);
      formData.append('description',ProData.description);
      formData.append('price',ProData.price);
      formData.append('cateName',ProData.cateName);
      formData.append('brandName',ProData.brandName);
      formData.append('profile','doremi.jpg');
      formData.append('image',this.fileData);

      this.proservices.addProduct(formData).subscribe(
        (res) => {
          console.log(res);
          this.route.navigateByUrl('/');
          this.alertify.Success("SuccessFully Added.");
        })        
    }
    else{
      this.alertify.Error("Data Not Addes.");
    }
  }

  getCategory()
  {
    this.cateservices.getCate().subscribe(
      (res) => {
        console.log("cate",res);
        this.category = res;
      },
      );
  }

}
