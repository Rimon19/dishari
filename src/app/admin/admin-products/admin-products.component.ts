import { UserService } from './../../user.service';
import { AppUser } from './../../models/app-user';
import { AuthService } from './../../auth.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
p=new Product();
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number; 
  appUser=new AppUser();
  specificUser=new AppUser();

  constructor( private auth: AuthService,
    private productService: ProductService,
    private userService:UserService) { 

       this.auth.appUser$.forEach(element => {
         this.appUser=element;  
        
         if(this.appUser.isAdmin){

            this.subscription = this.productService.getAll()
            .subscribe(products => {
              this.products = products;        
              this.initializeTable(products);
            });
         } 

         if(this.appUser.isMarchand&&this.appUser.isActive){

          this.subscription = this.productService.getProducByUserId(this.appUser.$key)
          .subscribe(products => {
            this.products = products;
            console.log(products);
            this.initializeTable(products);
          });
       } 
         

       });

     
   

  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  filter(query: string) { 
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase()
      .includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

getSpecificUserInfo(uid){
  console.log(uid);
  this.userService.get(uid).forEach(element => {
   this.specificUser= element;
    console.log(this.specificUser);
  }); 
 

}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    // this.auth.appUser$.subscribe(appUser => 
    // console.log("admin-product",this.appUser = appUser));
  }


  delete(id){
       console.log('id:',id);
       if (id) this.productService.get(id).take(1)
    .subscribe(p => this.p = p);
    console.log("obj",this.p);
    this.productService.deleteUpload(this.p);
  }
}
