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
import { LibraryService } from '../library.service';

declare function MyMethod():any;
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
    private router:Router,
    private libraryService:LibraryService) { }

  async ngOnInit() {
    
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$ .forEach(element => {
      this.cart=element;
    });
 
    this.userSubscription = this.authService.user$
    .subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy() { 
    this.userSubscription.unsubscribe();
  }
  async checkOut(){

      if(this.cart.totalPrice>0){
        this.router.navigate(['/check-out']);
      }else{
        let order = new Order(this.userId, this.shipping, 
          this.cart,this.cart.totalPrice,
          this.cart.totalItemsCount);
          order.status="approved";
        
        this.cart.items.forEach(element => {
          this.book.key=element.$key;          
          this.book.title=element.title;
          this.book.price =element.price;

          this.book.titleInBangla=element.titleInBangla;
          this.book.imageUrl=element.imageUrl;
          this.book.bookPdfUrl=element.bookPdfUrl;
          this.book.category=element.category;
          this.book.author=element.author;
          this.book.condition=element.condition;
         // this.book.writter=element.writter;
        //  this.book.publication=element.publication;
           
       //serch and entry date will be added here
          let result = this.libraryService.addToLibrary( this.book,this.userId);

        });

        let result = await this.orderService.placeOrder(order);
        console.log('cart items',this.cart.items);
        this.router.navigate(['/order-success-free-books', result.key]);
      }
    
  }
  
  RemoveFromShoppingCart(item){
 
     this.shoppingCartService.removeFromCart(item);
    
  }
  clearCart() { 
    this.shoppingCartService.clearCart();
  }
  animationStarted($event) {  }
  animationDone($event) {  }
}
