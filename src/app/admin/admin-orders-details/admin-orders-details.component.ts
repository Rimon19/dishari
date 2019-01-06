import { AuthService } from '../../auth.service';
import { OrderService } from '../../order.service';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-orders-details',
  templateUrl: './admin-orders-details.component.html',
  styleUrls: ['./admin-orders-details.component.scss']
})
export class AdminOrdersDetailsComponent implements OnInit {
  orderDate;
  userId;
  orders$;
  items;
  paramObject;
  order: any;

  constructor( private authService:AuthService,
    private orderService:OrderService,
    private route:ActivatedRoute


  ) {


    this.route.queryParamMap.subscribe(params => {
      this.paramObject = {...params};

      for (let prop in this.paramObject) {
        this.userId=this.paramObject[prop]['id'];
        this.orderDate=this.paramObject[prop]['oDate'];
      }

    });


    this.orders$ = authService.user$
    .switchMap(u => orderService.getOrdersByUser(this.userId));

    this.orders$.subscribe(_items=> {
    this. items=_items;
    
 
 

  })

  }

  ngOnInit() {
  }

}
