import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Model/category';
import { CategoryService } from 'src/app/services/category.service';
import * as alertify from 'alertifyjs';
import { AlertifyServicesService } from 'src/app/services/alertify-services.service';
import { error } from 'alertifyjs';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  category:Category[] = []

  ValidForm:FormGroup = new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
    brand:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
  });

  get Name(): FormControl
  {
    return this.ValidForm.get('name') as FormControl;
  }

  get Brand(): FormControl
  {
    return this.ValidForm.get('brand') as FormControl;
  }
  
  constructor(private cateservices:CategoryService,private alerty:AlertifyServicesService,private Route:Router){
    this.getCategory();
  }

  addCateReq: Category ={
    id:'',
    name:'',
    brand:'',
}
  
  ngOnInit(): void {    
    this.getCategory();
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

  onDelete(id:string)
  {

      this.cateservices.deleteCategory(id).subscribe(
        res => {
          this.getCategory();
          this.alerty.Error("record deleted");
        });

  }

  addCategory()
  {
    if(this.ValidForm.valid)
    {
      this.cateservices.addCate(this.ValidForm.value).subscribe(
        (res) => {
          console.log(res);
          this.ValidForm.reset();
          this.Route.navigateByUrl('category-list');
          this.alerty.Success("Record Added");
          this.getCategory()
        }
      )
    }
  }

}
