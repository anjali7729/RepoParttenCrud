import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Model/category';
import { CategoryService } from 'src/app/services/category.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { AlertifyServicesService } from 'src/app/services/alertify-services.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  editCateReq: Category ={
    id:'',
    name:'',
    brand:'',
}

  constructor(private cateservices:CategoryService,private active:ActivatedRoute,private route:Router,private alertify:AlertifyServicesService) { }

  ngOnInit():void {
    this.active.paramMap.subscribe((res) => {
      console.log(res);
      const id = res.get('id');

      if(id)
      {
        this.cateservices.getCatebyId(id).subscribe(
           (res) => {
            this.editCateReq = res;
          }
        );
      }
  });
  }

  editCategory()
  {
    this.cateservices.editCategory(this.editCateReq.id,this.editCateReq).subscribe(
      res => {
          this.route.navigateByUrl('category-list');
          this.alertify.Warning("Successfully Updated");
      }
    )
  }
}
