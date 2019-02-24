import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {

  constructor(private db: AngularFireDatabase) { }
  getPDF() {
 
}

get(productId) { 
  return this.db.object('/uploads/' + productId);
}

}
