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


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
 

  @Input() result:string="";  
  @Output() clicked=new EventEmitter<string>();  

  categories$;
  @Input('category') category;

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
 

  constructor(private router:Router,
    private auth: AuthService, 
    private shoppingCartService: ShoppingCartService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
     private productService: ProductService,

  ) { 
      
      this.categories$ = categoryService.getAll();
  }

  async ngOnInit() { 
  this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  
    this.cart$ = await this.shoppingCartService.getCart();
      
  }
  
  logout() {
    this.auth.logout();
    this.shoppingCartService.clearCart();
  }

  filter(query: string) {
    if(query!=null&&query!=""){
      this.router.navigate(['/'], { queryParams: { query: query} });
    }
    // else{
    //   this.router.navigate(['/'], { queryParams: { query: "search"} });
    //   window.location.reload();
    // }
   
   
  //  this.router.navigate(['/admin/ordersDetails/'], { queryParams: { id: userId, 'oDate': oDate } });
  //  window.location.reload();
  //  let productCompnt=new ProductsComponent(this.route,this.productService,this.shoppingCartService);
  //  productCompnt.filter(query);
   

   }

  homePageReload(){
     window.location.reload();
   }

}
