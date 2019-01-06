
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Component} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import { trigger, transition, animate, style, query,  group } from '@angular/animations';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  animations:[
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('h1', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ])
        ])
      ])
    
    ])
  ]
})
export class MyOrdersComponent {
  orders$;
  items;
 orderDate;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    public dialog: MatDialog) { 

    this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
     
    this.orders$.subscribe(_items=> {
     this. items=_items;
  });
}

    onClickGetDate(orderDate:string){
       this.orderDate=orderDate;     
    }
}
