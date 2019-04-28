import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './models/order';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase,
     private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  update(orderId, order) {
    return this.db.object('/orders/' + orderId).update(order);
  }
 
  getOrders() { 
    return this.db.list('/orders');
  }
  
 
  
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId        
      }
    });
  }

  getOrdersByDate(searchDate: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'searchDate',
        equalTo: searchDate        
      }
    });
  }
  getOrdersByStatusWherePending() {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'status',
        equalTo: 'pending'        
      }
    });
  }

 
  
}
