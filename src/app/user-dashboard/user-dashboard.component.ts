import { AuthService } from './../auth.service';
import { UserBook } from './../models/user-book';
import { LibraryService } from './../library.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
 allBooks:UserBook[]=[];
 filteredBooks:UserBook[]=[];
 userId;
  constructor(private libraryService:LibraryService,
    private authService:AuthService) {
   
    
   }

  ngOnInit() {
    // this.userId= localStorage.getItem('userUid');
    // let allbooks=this.libraryService.getAllBooks(this.userId);
    // allbooks.forEach(element => {
    //   this.allBooks=element;
    // });
  }

  // filterBooks(query){
    
  //   let filteredResult = (query) ?
  //   this.allBooks.filter(p => p.title.toLowerCase()
  //   .includes(query.toLowerCase())) :
  //    this.allBooks;      
  //    this.filteredBooks=filteredResult;
  // }

}
