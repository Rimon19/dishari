import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private db: AngularFireDatabase) { }

   addToLibrary(books,userId){
    console.log(books);
    console.log(userId);
   let result =  this.db.list(`library/${userId}`).push(books);
   console.log("s result",result);
   return result;
 }

 getAllBooks(userId) { 
  return this.db.list(`library/${userId}`);
}

}
