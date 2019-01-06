import { RegistrationModel } from '../models/registration.model';
import { checkSpace } from './checkSpace';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormGroup,FormBuilder, ValidationErrors} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { moveIn} from '../router.animations';

// tslint:disable-next-line:no-duplicate-imports
//import { Moment} from 'moment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
//import'rxjs/add/operator/catch';
//import { observable } from 'rxjs';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

//const moment =  _moment;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations:[moveIn()],
  host:{'[@moveIn]':''},
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})

export class SignUpComponent implements OnInit {
state:string='';
error:any;

  startDate = new Date(1990, 0, 1);
  hide = true;
  

  registrationForm=new FormGroup({
    name:new FormControl('',[Validators.required]),

    email: new FormControl('', [Validators.required, 
      Validators.email]),

    password:new FormControl('',[Validators.required,
      Validators.minLength(6),Validators.maxLength(15),
    checkSpace.canNotContainSpace]),

    confirmPassword:new FormControl('',[Validators.required,
      Validators.minLength(6),Validators.maxLength(15),
   checkSpace.canNotContainSpace]),

      mobileNumber:new FormControl(''),
      
      date : new FormControl(''),
      gender:new FormControl('')
  },
);
 

  user:RegistrationModel=new RegistrationModel();
  
  constructor(private userService:UserService,private router:Router){}

ngOnInit(){

}


get name(){
  return this.registrationForm.get('name');
}
get email(){
  return this.registrationForm.get('email');
}
get password(){
  return this.registrationForm.get('password');
}
get confirmPassword(){
  return this.registrationForm.get('confirmPassword');
}
get mobileNumber(){
  return this.registrationForm.get('mobileNumber');
}
get date(){
  return this.registrationForm.get('date');
}


get gender(){
  return this.registrationForm.get('gender');
}

  signUp(registrationForm){
   // registrationForm.date=registrationForm.date._i;
    this.userService
    .signUp(registrationForm)
    .then(success=>{
      this.router.navigate(['/']);
     // window.location.reload();
    }).catch(error=>{
      alert(error.message);
    })

  }
  

//  getErrorMessage() {
//   return this.email.hasError('required') ? 'You must enter a value' :
//       this.email.hasError('email') ? 'Not a valid email' :
//           '';
// }

}  



