import { Category } from './../models/category';
import { CategoryService } from './../category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  id;
  cart$: Observable<ShoppingCart>;
  categories:Category[]=[];
  filteredCategories:Category[]=[];
  categoryName:string;

  constructor(private route: ActivatedRoute,
   private productService: ProductService,
   private cartService: ShoppingCartService,
   private catergoryService:CategoryService
  ) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id)
    .take(1).subscribe(p => {
      this.product = p;
      
      const catgry=this.catergoryService.getAll();
      catgry.forEach(element => {
        this.categories=element;
        console.log(this.categories);

        let filteredProducts = (this.product.category) ?
        this.categories.filter(p => p.$key.toLowerCase()
        .includes(this.product.category.toLowerCase())) :
         this.categories;      
         this.filteredCategories=filteredProducts;
         console.log(this.filteredCategories);
         this.filteredCategories.forEach(element => {
          this.categoryName=element.name;
         });
         
      });
 
     

    });
    //console.log(this.product);

   }

   addToCart() {
    this.cartService.addToCart(this.product);
  }

async  ngOnInit() {
    this.cart$ = await this.cartService.getCart();
     
   
  }

}
