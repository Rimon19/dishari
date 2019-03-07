import { AuthService } from './../auth.service';
import { UserBook } from './../models/user-book';
import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-all-books',
  templateUrl: './user-all-books.component.html',
  styleUrls: ['./user-all-books.component.scss']
})
export class UserAllBooksComponent implements OnInit {

  allBooks:UserBook[]=[];
 filteredBooks:UserBook[]=[];
 userId;
 hide:boolean;
  constructor(private libraryService:LibraryService,
    private authService:AuthService,
    private router:Router) {
     this.hide=false;
    
   }

  ngOnInit() {
    this.userId= localStorage.getItem('userUid');
    let allbooks=this.libraryService.getAllBooks(this.userId);
    allbooks.forEach(element => {
      this.allBooks=element;
    });
  }

  filterBooks(query){
    this.hide=true;
    let filteredResult = (query) ?
    this.allBooks.filter(p => p.title.toLowerCase()
    .includes(query.toLowerCase())) :
     this.allBooks;      
     this.filteredBooks=filteredResult;
  }

}
