import { RegistrationModel } from '../models/registration.model';
import { checkSpace } from './checkSpace';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormGroup,FormBuilder, ValidationErrors} from '@angular/forms';
import * as _moment from 'moment';
import { moveIn} from '../router.animations';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations:[moveIn()],
  host:{'[@moveIn]':''}
 

})

export class SignUpComponent implements OnInit {
state:string='';
error:any;


  hide = true;
  

  registrationForm=new FormGroup({
    name:new FormControl('',[Validators.required]),

    email: new FormControl('', [Validators.required, 
      Validators.email]),

    password:new FormControl('',[Validators.required,
      Validators.minLength(6),Validators.maxLength(15),
    checkSpace.canNotContainSpace]),
    

      mobileNumber:new FormControl(''),
      
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

get mobileNumber(){
  return this.registrationForm.get('mobileNumber');
}


  signUp(registrationForm){
 
    this.userService
    .signUp(registrationForm)
    .then(success=>{
      this.router.navigate(['/']);
    }).catch(error=>{
      alert(error.message);
    })

  }
  

}  



