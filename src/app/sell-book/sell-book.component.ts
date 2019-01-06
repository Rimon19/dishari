import { UserAddressService } from './../user-address.service';
import { Router } from '@angular/router';
import { CellRequestService } from './../cell-request.service';
import { ProductForm } from './../models/product-form';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Observable } from '../../../node_modules/rxjs';
import { UserAddres } from '../models/user-address';
import { slide, moveIn } from '../router.animations';
import {  fade } from '../animation';


@Component({
  selector: 'app-sell-book',
  templateUrl: './sell-book.component.html',
  styleUrls: ['./sell-book.component.scss'],
  animations:[
    fade
  ]
})
export class SellBookComponent implements OnInit {
  categories$;
  subCategory$;
  condition$;
  location$;
  userId;
  user$: Observable<firebase.User>;
  appUser$;
  _u;
  product=new ProductForm(); 
  address:UserAddres[]=[];
  address$;
  willUpdate;
  addr=new UserAddres();
  $key;

  constructor(private categoryService: CategoryService,
     private authService: AuthService,
    private cellService:CellRequestService,
    private userService: UserService,
    private user:UserService,
    private userAddressServic:UserAddressService,
  private router:Router) { 

    this.categories$ = categoryService.getAll();
    this.subCategory$=categoryService.getAllSubCategories();
    this.condition$=categoryService.getAllcondition();
    this.location$=categoryService.getAllLocation();

    

     this.address$ = authService.user$.switchMap(u => userAddressServic.getAddressByUser(u.uid));
    this.address$.subscribe(_items=> {
      this.address=_items;
      if(this.address.length!=0){
        if (this.address[0].$key) this.userAddressServic
        .get(this.address[0].$key).take(1).subscribe(p => this.addr = p);
        this.$key=this.address[0].$key;
       }
 });

 
    
  }

  async saveAddress(address){

    let userUid = localStorage.getItem('userUid');
    address.userId=userUid;
     this.userAddressServic.create(address);
  }
  async updateAddress(addr){

     this.userAddressServic.update(this.$key,addr);
     this.willUpdate=0;
 }
 async willUpdateAddress(){
      this.willUpdate=1;
    }
  async deleteAddress(){
    
  }
  async save(celledBook) { 
 
    let userUid = localStorage.getItem('userUid');
    this.appUser$=this.user.get(userUid);
    this.appUser$.subscribe(u=> {
      this. _u=u; 
   });
    let datePlaced = new Date().getTime();

    if(this._u.name!=null){

      let sellBookedWholInfo={
        fullname:this._u.name,
        mobile:this._u.mobileNumber,
        userId:userUid,
        datePlaced:datePlaced,
        status:'Pending',
        cellBookedInfo:celledBook
      }
    
    }
    if(this._u.fullName!=null){
      let sellBookedWholInfo={
        fullname:this._u.fullName,
        mobile:this._u.mobileNumber,
        userId:userUid,
        datePlaced:datePlaced,
        status:'Pending',
        cellBookedInfo:celledBook
      }
    
      this.cellService.create(sellBookedWholInfo);
      this.router.navigate(['/my/cellRequest']);
    }
  
 
  
 
    // this.router.navigate(['/admin/products']);
    }
  ngOnInit() {
   
   // this.user$
   // .switchMap(user =>this.userId=user.uid);
   // console.log(this.userId);
  }

 

}
