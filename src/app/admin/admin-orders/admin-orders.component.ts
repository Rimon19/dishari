import { LibraryService } from './../../library.service';
import { UserBook } from './../../models/user-book';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { OrderService } from '../../order.service';
import { Component, OnInit } from '@angular/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
export class AdminOrdersComponent {
  orders$;
  book=new UserBook();

  startDate = new Date(2019, 0, 1);
  form=new FormGroup({

      date : new FormControl('')
 
  });

  constructor(private orderService: OrderService,
    private router:Router,
    private libraryService:LibraryService) { 
    this.orders$ = orderService.getOrdersByStatusWherePending();
    // this.orders$.forEach(element => {
    //   this.orders=element;
    //   console.log(this.orders);
    // });
   
  }
  approvedOrder(order){
    console.log(order.userId);
    order.items.forEach(element => {
      console.log('product',element.product);
      this.book.key=element.product.key;
      this.book.title=element.product.title;
      
      this.book.price =element.product.price;
     this.book.titleInBangla=element.product.titleInBangla;
      this.book.imageUrl=element.product.imageUrl;
      this.book.bookPdfUrl=element.product.bookPdfUrl;
      this.book.category=element.product.category;
     // this.book.writter=element.product.writter;
      //this.book.publication=element.product.publication;
       this.book.condition=element.product.condition;
       this.book.author=element.product.author;

       //serch and entry date will be added here
      
      let result = this.libraryService.addToLibrary( this.book,order.userId);
    });

     order.status="approved";
     this.orderService.update(order.$key,order);

  }
  queryParams(userId,oDate) {
    this.router.navigate(['/admin/ordersDetails/'], { queryParams: { id: userId, 'oDate': oDate } });
 
  }
  searchByDate(formValue){
   
  let sMonth=formValue.date._i.month + 1;
  let searchDate=formValue.date._i.year
  +''+sMonth+''+formValue.date._i.date;
  this.orders$=this.orderService.getOrdersByDate(searchDate);
  

  }
  get date(){
    return this.form.get('date');
  }
}
