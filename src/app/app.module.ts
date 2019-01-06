import { CellRequestService } from './cell-request.service';

import {ValidatePassword} from './sign-up/validatePassword';
import { OrderService } from './order.service';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabaseModule } from 'angularfire2/database'; 
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { RouterModule } from '@angular/router'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; 
import { CustomFormsModule } from 'ng2-validation'; 
import { DataTableModule } from 'angular5-data-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon"; 
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { ProductsDetailsComponent } from './products-details/products-details.component';
//import { TestProductsComponent } from './test-products/test-products.component';
//import { MyOrdersDetailsComponent } from './my-orders-details/my-orders-details.component';
//import {MatDialogModule} from '@angular/material/dialog';
import { AdminOrdersDetailsComponent } from './admin/admin-orders-details/admin-orders-details.component';
import { SellBookComponent } from './sell-book/sell-book.component';
import { AdminCellRequestComponent } from './admin/admin-cell-request/admin-cell-request.component';
import { MyCellRequestComponent } from './my-cell-request/my-cell-request.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { TodosTestingPurposeComponent } from './todos-testing-purpose/todos-testing-purpose.component';
import { MarchandAuthGuard } from './marchand-auth-guard.service';
import { UserInfoDetailsComponent } from './user-info-details/user-info-details.component';


//import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    SignUpComponent,
    ValidatePassword,
    ProductsDetailsComponent,
    //TestProductsComponent,
   // MyOrdersDetailsComponent,
    AdminOrdersDetailsComponent,
    SellBookComponent,
    AdminCellRequestComponent,
    MyCellRequestComponent,
    AppFooterComponent,
    TodosTestingPurposeComponent,
    UserInfoDetailsComponent,
    
   // FooterComponent,
 
  
  ],
  imports: [

    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatRadioModule,
    BrowserModule,
    FormsModule,
   // MatDialogModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    //NgxCarouselModule,
    RouterModule.forRoot([
      {
         path: 'h',
       component: HomeComponent ,
       canActivate: [AuthGuard,MarchandAuthGuard] 
      },

      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'todo', component: TodosTestingPurposeComponent },
     // { path: 'TestProducts', component: TestProductsComponent },
      { path: 'products/:id', component: ProductsDetailsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'sell-book', component: SellBookComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'my/cellRequest', component: MyCellRequestComponent, canActivate: [AuthGuard] },
     // { path: 'orderdetails', component: MyOrdersDetailsComponent, canActivate: [AuthGuard] },

       //marchand access link
       { 
        path: 'marchand/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, MarchandAuthGuard] 
      },
      { 
        path: 'marchand/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, MarchandAuthGuard] 
      },
      { 
        path: 'marchand/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, MarchandAuthGuard] 
      },
      { 
        path: 'marchand/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, MarchandAuthGuard]

      },
      
      { 
        path: 'marchand/ordersDetails', 
        component: AdminOrdersDetailsComponent, 
        canActivate: [AuthGuard, MarchandAuthGuard] 
      },
      { 
        path: 'marchand/adminCellRequest', 
        component: AdminCellRequestComponent, 
        canActivate: [AuthGuard, MarchandAuthGuard] 
      },

      //Admin access link
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]

      },
      
      { 
        path: 'admin/ordersDetails', 
        component: AdminOrdersDetailsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/adminCellRequest', 
        component: AdminCellRequestComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      }
      ,
      { 
        path: 'user-info-details/:uid', 
        component: UserInfoDetailsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      }
    ])    
  ],
  
  schemas: [ NO_ERRORS_SCHEMA ],
  
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    CellRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
