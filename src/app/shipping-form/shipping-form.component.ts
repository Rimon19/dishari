import { UserBook } from './../models/user-book';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from "../models/order";
import { ShippingForm } from '../models/shipping-form';
import { Product } from '../models/product';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = new ShippingForm(); 
  userSubscription: Subscription;
  userId: string;
  
  book=new UserBook();

 
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$
    .subscribe(user => this.userId = user.uid);
  
  }

  ngOnDestroy() { 
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, 
      this.cart,this.cart.totalPrice,
      this.cart.totalItemsCount);
      order.status="pending";

    console.log("order",order);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);

   
  }    
}
