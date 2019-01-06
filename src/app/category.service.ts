import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() { 
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getAllSubCategories() { 
    return this.db.list('/subCategories', {
      query: {
        orderByChild: 'name'
      }
    });
  }
  
  getAllcondition() { 
    return this.db.list('/condition', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getAllLocation() { 
    return this.db.list('/location', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
