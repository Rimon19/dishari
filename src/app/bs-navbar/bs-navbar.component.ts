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

declare function MyMethod(): any;
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {


  @Input() result: string = "";
  @Output() clicked = new EventEmitter<string>();

  categories$;
  @Input('category') category;

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;


  constructor(private router: Router,
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
    console.log("v", query);
    if (query != null && query != "") {

      console.log("filter called");
      this.router.navigate(['/'], { queryParams: { query: query } });
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

  homePageReload() {
    window.location.reload();
  }

}
