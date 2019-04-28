import { Product } from './../models/product';
import { OrderService } from './../order.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';
import { Title } from '@angular/platform-browser';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-marchand-dashboard',
  templateUrl: './marchand-dashboard.component.html',
  styleUrls: ['./marchand-dashboard.component.scss']
})
export class MarchandDashboardComponent implements OnInit {
 totalBooksCount:Number;
 orders:Order[]=[];

 pd:any[]=[];
 filteredProducts:Product[]=[];
 totalSales:Number;

 totalAmount = 0;
  constructor(private productService:ProductService,private orederService:OrderService) { }

  ngOnInit() {
    let userUid = localStorage.getItem('userUid');
   const products= this.productService.getProducByUserId(userUid);
   products.forEach(element => {
     this.totalBooksCount=element.length;
   });
  
   this.orederService.getOrders().subscribe(c=>{
     this.orders=c;
     this.orders.forEach(i=>{                 
           let p= i.items.map(i => {
              return {
                product: {                  
                  title: i.product.title,
                  price: i.product.price,                  
                  publishersUid:i.product.publishersUid
                }
              }
            })  
            p.forEach(element => {
              this.pd.push(
                {
                  'title':element.product.title,
                  'price':element.product.price,
                  'publishersUid':element.product.publishersUid,
                 });
            });
                    
   });
  
   let userUid = localStorage.getItem('userUid');
   this.filteredProducts = (userUid) ? 
   this.pd.filter(p => p.publishersUid === userUid) : 
   this.pd;

   this.totalSales=this.filteredProducts.length;
    
   if(this.totalAmount==0){
    this.filteredProducts.forEach(element => {
      console.log(element.price);
      this.totalAmount += element.price;
    });
   }
     

   })
   
  }




}
