import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { TrendingsProducts1 } from './models/Trendings-Products';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) { 
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products');
  }
  
  get(productId) { 
    return this.db.object('/products/' + productId);
  }

  update(productId, product) { 
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) { 
    return this.db.object('/products/' + productId).remove();
  }

  getAllTrendingsProducts(){
    return this.db.list('/TrendingsProducts');
  }


  getProducByUserId(userId: string) {
    return this.db.list('/products', {
      query: {
        orderByChild: 'uid',
        equalTo: userId        
      }
    });
  }
  
}
