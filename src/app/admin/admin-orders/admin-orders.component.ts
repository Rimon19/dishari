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

  startDate = new Date(2019, 0, 1);
  form=new FormGroup({

      date : new FormControl('')
 
  });

  constructor(private orderService: OrderService,
    private router:Router) { 
    this.orders$ = orderService.getOrdersByStatusWherePending();
    // this.orders$.forEach(element => {
    //   this.orders=element;
    //   console.log(this.orders);
    // });
   
  }
  approvedOrder(order){
    console.log(order);
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
