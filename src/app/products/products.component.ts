import { FeaturedItems1, FeaturedItems2, FeaturedItems3, 
  FeaturedItems4, FeaturedItems5, FeaturedItems6, 
  FeaturedItems7, FeaturedItems8, FeaturedItems9, 
  FeaturedItems10, FeaturedItems11, FeaturedItems12, 
  FeaturedItems13, FeaturedItems14, FeaturedItems15, 
  FeaturedItems16, FeaturedItems17, FeaturedItems18, 
  FeaturedItems19, FeaturedItems20 } from './../models/Featured-Items';
import { TrendingsProducts2, TrendingsProducts3, 
  TrendingsProducts4, TrendingsProducts5, 
  TrendingsProducts6, TrendingsProducts7, 
  TrendingsProducts8, 
  TrendingsProducts9,
  TrendingsProducts10,
  TrendingsProducts11,
  TrendingsProducts12,
  TrendingsProducts13,
  TrendingsProducts14,
  TrendingsProducts15,
  TrendingsProducts16} from '../models/Trendings-Products';

import { TrendingsProducts1} from '../models/Trendings-Products';

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
 
  isCallJavascript;

  clickedproductDetails:Product;

  T_product1=new TrendingsProducts1();
  T_product2=new TrendingsProducts2();
  T_pruduct3=new TrendingsProducts3();
  T_pruduct4=new TrendingsProducts4();
  T_pruduct5=new TrendingsProducts5();
  T_pruduct6=new TrendingsProducts6();
  T_pruduct7=new TrendingsProducts7();
  T_pruduct8=new TrendingsProducts8();
  T_pruduct9=new TrendingsProducts9();
  T_pruduct10=new TrendingsProducts10();
  T_pruduct11=new TrendingsProducts11();
  T_pruduct12=new TrendingsProducts12();
  T_pruduct13=new TrendingsProducts13();
  T_pruduct14=new TrendingsProducts14();
  T_pruduct15=new TrendingsProducts15();
  T_pruduct16=new TrendingsProducts16();
  F_product1=new FeaturedItems1();
  F_product2=new FeaturedItems2();
  F_product3=new FeaturedItems3();
  F_product4=new FeaturedItems4();
  F_product5=new FeaturedItems5();
  F_product6=new FeaturedItems6();
  F_product7=new FeaturedItems7();
  F_product8=new FeaturedItems8();
  F_product9=new FeaturedItems9();
  F_product10=new FeaturedItems10();
  F_product11=new FeaturedItems11();
  F_product12=new FeaturedItems12();
  F_product13=new FeaturedItems13();
  F_product14=new FeaturedItems14();
  F_product15=new FeaturedItems15();
  F_product16=new FeaturedItems16();
  F_product17=new FeaturedItems17();
  F_product18=new FeaturedItems18();
  F_product19=new FeaturedItems19();
  F_product20=new FeaturedItems20();

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
    this.products$=  this.productService.getAll();
    this.populateProducts();
     
    this.products$.subscribe(_items=> {
     
      _items.forEach(element => {       
        if(element.IsTrendingPindex1){
          this.T_product1=element;   
           
        }
        if(element.IsTrendingPindex2){
          this.T_product2=element;      
        }
        if(element.IsTrendingPindex3){
          this.T_pruduct3=element;      
        }
        if(element.IsTrendingPindex4){
          this.T_pruduct4=element;      
        }
        if(element.IsTrendingPindex5){
          this.T_pruduct5=element;      
        }
        if(element.IsTrendingPindex6){
          this.T_pruduct6=element;      
        }
        if(element.IsTrendingPindex7){
          this.T_pruduct7=element;      
        }
        if(element.IsTrendingPindex8){
          this.T_pruduct8=element;      
        }
        if(element.IsTrendingPindex9){
          this.T_pruduct9=element;      
        }
        if(element.IsTrendingPindex10){
          this.T_pruduct10=element;      
        }
        if(element.IsTrendingPindex11){
          this.T_pruduct11=element;      
        }
        if(element.IsTrendingPindex12){
          this.T_pruduct12=element;      
        }
        if(element.IsTrendingPindex13){
          this.T_pruduct13=element;      
        }
        if(element.IsTrendingPindex14){
          this.T_pruduct14=element;      
        }
        if(element.IsTrendingPindex15){
          this.T_pruduct15=element;      
        }
        if(element.IsTrendingPindex16){
          this.T_pruduct16=element;      
        }

       //featured item load
        if(element.IsFeaturedPindex1){
          this.F_product1=element;      
        }
        if(element.IsFeaturedPindex2){
          this.F_product2=element;      
        }
        if(element.IsFeaturedPindex3){
          this.F_product3=element;      
        }
        if(element.IsFeaturedPindex4){
          this.F_product4=element;      
        }
        if(element.IsFeaturedPindex5){
          this.F_product5=element;      
        }
        if(element.IsFeaturedPindex6){
          this.F_product6=element;      
        }
        if(element.IsFeaturedPindex7){
          this.F_product7=element;      
        }
        if(element.IsFeaturedPindex8){
          this.F_product8=element;      
        }
        if(element.IsFeaturedPindex9){
          this.F_product9=element;      
        }
        if(element.IsFeaturedPindex10){
          this.F_product10=element;      
        }
        if(element.IsFeaturedPindex11){
          this.F_product11=element;      
        }
        if(element.IsFeaturedPindex12){
          this.F_product12=element;      
        }
        if(element.IsFeaturedPindex13){
          this.F_product13=element;      
        }
        if(element.IsFeaturedPindex14){
          this.F_product14=element;      
        }
        if(element.IsFeaturedPindex15){
          this.F_product15=element;      
        }
        if(element.IsFeaturedPindex16){
          this.F_product16=element;      
        }
        if(element.IsFeaturedPindex17){
          this.F_product17=element;      
        }
        if(element.IsFeaturedPindex18){
          this.F_product18=element;      
        }
        if(element.IsFeaturedPindex19){
          this.F_product19=element;      
        }
        if(element.IsFeaturedPindex20){
          this.F_product20=element;      
        }
      });
   
    })
   
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
           this.applyFilter();  
        }
        if(this.category==null&&this.query==null){
          
          this.filteredProducts=[];     
          //this.router.navigate(['/']);    
       }
        if(this.query!=null&&this.query!=""){
          this.filter(this.query); 
        }
       
        if(this.query=="search"){
         // window.location.reload();
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

  }


   filter(query: string) { 
   
     let filteredProducts = (query) ?
       this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
        this.products;      
        this.filteredProducts=filteredProducts;
 
    }


   addToCart( product:Product) {
    
    
    var cart = $('.icon-handbag');
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
