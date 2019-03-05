import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take'; 
import 'rxjs/add/operator/map'; 
import { UserBook } from './models/user-book';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }


  async addToCart(product: Product) { 
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
     item$.take(1).subscribe(item => {
     item$.remove();
    });
  }

  async clearCart() { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  

  private create() { 
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> { 
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId; 

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
   let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
     // let quantity = (item.quantity || 0) + change;
      let quantity = change;
     if (quantity === 0) item$.remove();
      else item$.update({ 
       
        title: product.title,
        price: product.price,
        quantity: quantity,

      //   titleInBangla:product.titleInBangla,
         imageUrl: product.imageUrl,
      //   imageUrl2:product.imageUrl2,
      //   bookPdfUrl:product.bookPdfUrl,

      //  category: product.category,
      //  writter:product.writter,
      //  publication:product.publication,
      //   author:product.author,
      //  condition:product.condition
     
      
      


      });
  });
  }
}
