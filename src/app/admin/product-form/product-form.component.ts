import { Product } from './../../models/product';
import { AppUser } from './../../models/app-user';
import { AuthService } from './../../auth.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { CategoryService } from '../../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take'; 
import { ProductForm } from '../../models/product-form';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  subCategory$;
  condition$;
  location$;
  product=new Product(); 
  id;
  appUser=new AppUser();
  selectedFilesForFrontCvrImg: FileList;
  selectedFilesForBakendCvrImg: FileList;
  selectedFilesForDemoPdf: FileList;
  selectedFilesForPdf: FileList;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private auth: AuthService,
    private categoryService: CategoryService, 
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();
    console.log(this.categories$);
    this.subCategory$=categoryService.getAllSubCategories();
    this.condition$=categoryService.getAllcondition();
    this.location$=categoryService.getAllLocation();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1)
    .subscribe(p => this.product = p);
   
  }

  save(product) { 


   this.product=product;
   this.product.entryDate=new Date().getTime();
   var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
 
   this.product.searchDate = year+''+month+''+day;

    console.log(product);

    this.auth.appUser$.forEach(element => {
      this.appUser=element; 
      if(this.appUser.isAdmin){ 

          if (this.id) this.productService.update(this.id, this.product);
         else this.productService.pushUpload(product);
          this.router.navigate(['/admin/products']);

      }

      if(this.appUser.isMarchand&&this.appUser.isActive){

        let userUid = localStorage.getItem('userUid');
        this.product.uid=userUid;
        this.product.isDishariProduct=false;
        
        if (this.id) this.productService.update(this.id, this.product);
        else this.productService.create(product);
         this.router.navigate(['/marchand/products']);
        }
     });
   
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(this.id);
    this.auth.appUser$.forEach(element => {
      this.appUser=element; 
      if(this.appUser.isAdmin){ this.router.navigate(['/admin/products']);}
      if(this.appUser.isMarchand&&this.appUser.isActive){ this.router.navigate(['/marchand/products']);}
     });
  }

  detectFilesForFrontCvrImg(event) {
    this.selectedFilesForFrontCvrImg = event.target.files;
    this.product.imageUrlFile=this.selectedFilesForFrontCvrImg.item(0);

  }

 detectFilesForBakendCvrImg(event) {
  this.selectedFilesForBakendCvrImg = event.target.files;
  this.product.imageUrl2File=this.selectedFilesForBakendCvrImg.item(0);
  }

  detectFilesForDemoPdfFile(event) {
    this.selectedFilesForDemoPdf = event.target.files;
    this.product.demoPdfFile=this.selectedFilesForDemoPdf.item(0);
    }
    detectFilesForPdfFile(event) {
      this.selectedFilesForPdf = event.target.files;
      this.product.bookPdfFile=this.selectedFilesForPdf.item(0);
      }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }


}
