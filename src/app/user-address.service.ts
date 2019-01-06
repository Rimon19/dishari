import { UserAddres } from './models/user-address';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<UserAddres[]> {
    return this.db.list('/Address');
  }
  create(address) { 
    return this.db.list('/Address').push(address);
  }
  update(addressId, product) { 
    return this.db.object('/Address/' + addressId).update(product);
  }
  get(addressId) { 
    return this.db.object('/Address/' + addressId);
  }
  delete(addressId) { 
    return this.db.object('/Address/' + addressId).remove();
  }
  getAddressByUser(userId: string) {
    return this.db.list('/Address', {
      query: {
        orderByChild: 'userId',
        equalTo: userId        
      }
    });
  }
}
