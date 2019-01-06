import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CellRequestService {

  constructor(private db: AngularFireDatabase) { }

  create(product) { 
    return this.db.list('/cellRequest').push(product);
  }
  update(product,productId ) { 
    return this.db.object('/cellRequest/' + productId).update(product);
  }
  getRequest() { 
    return this.db.list('/cellRequest');
  }


  
  getOrdersByUser(userId: string) {
    return this.db.list('/cellRequest', {
      query: {
        orderByChild: 'userId',
        equalTo: userId        
      }
    });
  }
}
