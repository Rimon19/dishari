

import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import 'rxjs/add/operator/switchMap';
declare var $:any;


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
  
 
})

export class ProductsComponent implements OnInit  {
  state:string='';
  showActions = true;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchProducts: Product[] = [];
  category: string;
  query:string;
  cart$: Observable<ShoppingCart>;
  isControls; 
  products$;
  p;
  bookSearched:boolean;
  searchItemFound:boolean;
  isCallJavascript;

  clickedproductDetails:Product;

  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService, 
    private router:Router
    
  ) {
     
  }

  async ngOnInit() {

    $.getScript('assets/js/jquery-3.2.1.min.js');
    $.getScript('assets/js/popper.min.js');
    $.getScript('assets/js/bootstrap.min.js');
    $.getScript('assets/vendors/revolution/js/jquery.themepunch.tools.min.js');
    $.getScript('assets/vendors/revolution/js/jquery.themepunch.revolution.min.js');
    $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.actions.min.js');
    $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.video.min.js');
    $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.slideanims.min.js');
    $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.layeranimation.min.js');
    $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.navigation.min.js');
    $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.slideanims.min.js');
    $.getScript('assets/vendors/counterup/jquery.waypoints.min.js');
    $.getScript('assets/vendors/counterup/jquery.counterup.min.js');
    $.getScript('assets/vendors/owl-carousel/owl.carousel.min.js');
    $.getScript('assets/vendors/bootstrap-selector/js/bootstrap-select.min.js');
    $.getScript('assets/vendors/image-dropdown/jquery.dd.min.js');
    $.getScript('assets/js/smoothscroll.js');
    $.getScript('assets/vendors/isotope/imagesloaded.pkgd.min.js');
    $.getScript('assets/vendors/isotope/isotope.pkgd.min.js');
    $.getScript('assets/vendors/magnify-popup/jquery.magnific-popup.min.js');
    $.getScript('assets/vendors/vertical-slider/js/jQuery.verticalCarousel.js');
    $.getScript('assets/vendors/jquery-ui/jquery-ui.js');
    $.getScript('assets/js/theme.js');
   
    

    this.cart$ = await this.shoppingCartService.getCart();
    //this.products$=  this.productService.getAll();
    this.populateProducts();
     
   
  }

  private populateProducts() { 
    this.productService
      .getAll()
      .switchMap(products => {
        this.products = products;
       
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.query = params.get('query');    
        if(this.category!=null&&this.category!=""){
          this.bookSearched=true;
           this.applyFilter();  
        }
        if(this.category==null&&this.query==null){
          this.bookSearched=false;
          this.filteredProducts=[];     
          //this.router.navigate(['/']);    
       }
        if(this.query!=null&&this.query!=""){
          this.bookSearched=true;
          this.filter(this.query); 
         
        }
       
        if(this.query=="search"){
         // window.location.reload();
         this.bookSearched=false;
          this.router.navigate(['/']);
        }
       
      });
  }

  private applyFilter() { 
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) : 
    this.products;


    if(this.category=="allCategory"){
      this.filteredProducts=this.products;
    }

    if(this.filteredProducts.length==0){
      this.searchItemFound=false;
     } 
     if(this.filteredProducts.length!=0){
      this.searchItemFound=true;
     } 

  }


   filter(query: string) { 
    
     let filteredProducts = (query) ?
       this.products.filter(p => p.title.toLowerCase()
       .includes(query.toLowerCase())) :
        this.products;      
        this.filteredProducts=filteredProducts;

       if(this.filteredProducts.length==0){
        this.searchItemFound=false;
       } 
       if(this.filteredProducts.length!=0){
        this.searchItemFound=true;
       } 
    }


   addToCart( product:Product) {
    
    
    var cart = $('.icon-book-open');
    // var imgtodrag = $(this).parent('.item').find("img").eq(0);
    //var imgtodrag = $('.-KrqgOLs07ZkbapP4EGi');
    if(product.$key!=undefined){
     var imgtodrag = $('.'+product.$key);
     if (imgtodrag) {
         var imgclone = imgtodrag.clone()
             .offset({
             top: imgtodrag.offset().top,
             left: imgtodrag.offset().left
         })
             .css({
             'opacity': '0.5',
                 'position': 'absolute',
                 'height': '150px',
                 'width': '150px',
                 'z-index': '100'
         })
             .appendTo($('body'))
             .animate({
             'top': cart.offset().top + 10,
                 'left': cart.offset().left + 10,
                 'width': 75,
                 'height': 75
         }, 1000, 'easeInOutExpo');
         
         setTimeout(function () {
             //cart.effect("shake", {
                 //times: 2
             //}, 200);
         }, 1500);

         imgclone.animate({
             'width': 0,
                 'height': 0
         }, function () {
             $(this).detach()
         });
     }

    }
    this.shoppingCartService.addToCart(product);
    
  }

 
  // onClickGetProductDetails(productId:string){

  //   let specificProductDetails= this.productService.get(productId);
  //   specificProductDetails.subscribe(_items=> {
  //     this.clickedproductDetails=_items;
  //     console.log(this.clickedproductDetails);
 
  //   })
  // }

}
