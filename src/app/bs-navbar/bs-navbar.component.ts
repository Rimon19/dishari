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

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();

    window.onscroll = function () { MyMethod() };

    var header = document.getElementById("fixtopbar");
    var header3 = document.getElementById("fixtopbar8");
    var header2 = document.getElementById("fixtop3");
    var header5 = document.getElementById("shoppingid2");
    


    var sticky = header.offsetTop;

    function MyMethod() {

      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        header2.classList.add("sticky2");
        header2.classList.add("sticky9");
        header3.classList.add("sticky3");
        header5.classList.add("showHeading");
        
        //   header3.classList.add("sticky4");
      } else {

        header.classList.remove("sticky");
        header2.classList.remove("sticky2");
        header2.classList.remove("sticky9");
        header3.classList.remove("sticky3");
        header5.classList.remove("showHeading");
        //headerUser.classList.remove("stickyUSer");
        //    header3.classList.remove("sticky4");
      }
    }


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
