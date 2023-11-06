import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';

// const routes: Routes = [
//   { path:'home',component:HomeComponent,canActivate:[AuthGuardGuard]},
//   { path:'login',component:LoginComponent },
//   { path:'register',component:RegisterComponent },
//   { path:'add-product',component:AddProductComponent},
//   { path:'',component:HomeComponent},
//   { path:'product-details/:id',component:ProductDetailsComponent},
//   { path:'edit-product/:id',component:EditProductComponent},
//   { path:'category-list',component:CategoryListComponent},
//   { path:'edit-category/:id',component:EditCategoryComponent},
//   //{ path:'',redirectTo:'login',pathMatch:'full'},
//   { path:'**',component:PageNotFoundComponent}

// ];

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuardGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'product-details/:id', component: ProductDetailsComponent, canActivate: [AuthGuardGuard] },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuardGuard] },
  { path: 'category-list', component: CategoryListComponent, canActivate: [AuthGuardGuard] },
  { path: 'edit-category/:id', component: EditCategoryComponent, canActivate: [AuthGuardGuard] },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
