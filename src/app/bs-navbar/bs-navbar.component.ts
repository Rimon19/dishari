import { Product } from './../models/product';
import { Filter } from './../models/filter';
import { ActivatedRoute, Router } from '@angular/router';


import { CategoryService } from '../category.service';

import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { ProductsComponent } from '../products/products.component';
import { ProductService } from '../product.service';

import { Subscription } from 'rxjs/Subscription';
import {FormControl} from '@angular/forms';

import {map, startWith} from 'rxjs/operators';
declare var $:any;

declare function MyMethod(): any;
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;


  @Input() result: string = "";
  categories$;
  @Input('category') category;

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  filterClass=new Filter();

  expandMenu:boolean;
  bsfilteredProducts: Product[] = [];
  bsproducts: Product[] = [];
 

  constructor(private router: Router,
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,

  ) {
    this.route.queryParamMap
      .subscribe(params => {
        this.filterClass.query = params.get('query');      
      });
    this.categories$ = categoryService.getAll();
    this.productService.getAll().subscribe(p=>{
      this.bsproducts=p;
      this.bsproducts.forEach(i=>{ 
        this.options.push(i.title);
      });
    });
    
  }

  async ngOnInit() {

//     var i = 0;
// var txt = 'Lorem ipsum dummy text blabla.';
// var speed = 50;

// function typeWriter() {
//   if (i < txt.length) {
//     this.searchingExapleText= txt.charAt(i);
//     i++;
//     setTimeout(typeWriter, speed);
//   }
// }


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();
    
  var yourNavigation = $(".nav2");
  var anothernav = $(".fixtop3");
  var anothernav2 = $(".fixtopbar8");
  var stickyRes = "sticky3";
  var stickymenu = "sticky2";
  var stickyDiv = "sticky";
  var yourHeader = $('.header').height();

$(window).scroll(function() {
if( $(this).scrollTop() > yourHeader ) {
  yourNavigation.addClass(stickyDiv);
  anothernav.addClass(stickymenu);
  anothernav2.addClass(stickyRes);
} else {
  yourNavigation.removeClass(stickyDiv);
  anothernav.removeClass(stickymenu);
  anothernav2.removeClass(stickyRes);
}

});



  }

  logout() {
    this.auth.logout();
    this.shoppingCartService.clearCart();
  }
  

  filter(query: string) {
   
    if (query != null && query != "") {
     
      this.router.navigate(['/'], { queryParams: { query: query } });

    }
  }
  

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (filterValue != null && filterValue != "") {
     
      this.router.navigate(['/'], { queryParams: { query: filterValue } });

    }
    
    return this.options.filter(option => option.toLowerCase()
    .indexOf(filterValue) === 0);
  }

}
