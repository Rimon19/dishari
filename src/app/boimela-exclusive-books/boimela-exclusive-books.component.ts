import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boimela-exclusive-books',
  templateUrl: './boimela-exclusive-books.component.html',
  styleUrls: ['./boimela-exclusive-books.component.scss']
})
export class BoimelaExclusiveBooksComponent implements OnInit {
  products: Product[] = [];
  subCategory: string;
  filteredProducts: Product[] = [];

  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
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
        this.subCategory = params.get('extraCategory');
          console.log(this.subCategory);
        if(this.subCategory!=null&&this.subCategory!=""){          
           this.applyFilter();  
        }
                    
      });
  }

  private applyFilter() { 
    this.filteredProducts = (this.subCategory) ? 
    this.products.filter(p => p.subCategory === this.subCategory) : 
    this.products;
    console.log(this.filteredProducts);

  }

}
