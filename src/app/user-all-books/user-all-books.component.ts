import { CategoryService } from './../category.service';
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
  product = new UserBook();
  allBooks:UserBook[]=[];
 filteredBooks:UserBook[]=[];
 userId;
 appUser;
 categories$
 hide:boolean;
  constructor(private libraryService:LibraryService,
    private authService:AuthService,
    private categoryService: CategoryService,
    private router:Router) {
     this.hide=false;
     this.categories$ = categoryService.getAll();
   }

  ngOnInit() {
     
  this.authService.appUser$.subscribe(appUser => this.appUser = appUser);

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

  filterBooksByCategory(category){
    this.hide=true;
    let filteredResult = (category) ?
    this.allBooks.filter(p => p.category === category) :
     this.allBooks;      
     this.filteredBooks=filteredResult;

   
  }

}
