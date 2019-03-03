import { AuthService } from './../auth.service';
import { ShoppingCart } from './../models/shopping-cart';
import { trigger, transition, animate, style, query,  group } from '@angular/animations';

import { ShoppingCartService } from '../shopping-cart.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { UserBook } from '../models/user-book';
import { Order } from '../models/order';
import { Subscription } from 'rxjs/Subscription';
import { ShippingForm } from '../models/shipping-form';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
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
export class ShoppingCartComponent implements OnInit,OnDestroy {
  cart$;
  cart: ShoppingCart;
  shipping = new ShippingForm();
  userId: string;
  userSubscription: Subscription;
  book=new UserBook();

  constructor(private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router:Router) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$ .forEach(element => {
      this.cart=element;
    });
    console.log(this.cart$);
    this.userSubscription = this.authService.user$
    .subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy() { 
    this.userSubscription.unsubscribe();
  }
  async checkOut(){
    console.log("clicked Shoping cart");

      if(this.cart.totalPrice>0){
        this.router.navigate(['/check-out']);
      }else{
        let order = new Order(this.userId, this.shipping, 
          this.cart,this.cart.totalPrice,
          this.cart.totalItemsCount);
          order.status="approved";
        
        this.cart.items.forEach(element => {
          console.log(element);
          this.book.key=element.$key;
          this.book.title=element.title;
          this.book.imageUrl=element.imageUrl;          
          let result = this.orderService.addToLibrary( this.book,this.userId);

        });

        let result = await this.orderService.placeOrder(order);
        console.log(this.cart.items);
        this.router.navigate(['/order-success', result.key]);
      }
    
  }
  
  clearCart() { 
    this.shoppingCartService.clearCart();
  }
  animationStarted($event) {  }
  animationDone($event) {  }
}
