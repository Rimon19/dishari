import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShippingForm } from '../models/shipping-form';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  shipping = new ShippingForm(); 
  resetPass = false;
  error;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  resetPassword(){
    
    this.auth.resetPassword(this.shipping.mobileNo)
    .then(() => {
      this.resetPass = true;
      this.error='';
    })
    .catch(_error => {
     this.error=_error.message;
    });
  }

}
