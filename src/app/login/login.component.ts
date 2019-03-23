

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Component, OnInit,HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[moveIn()],
  host:{'[@moveIn]':''}
})
export class LoginComponent  {

state:string='';
error:any;

 hide=true;

  loginForm=new FormGroup({
   
    email: new FormControl('', [Validators.required, 
      Validators.email]),
    password:new FormControl('',[Validators.required])
  },
);

  constructor(private auth: AuthService,private router:Router) { 
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  login(loginForm){
   this.auth.signIn(loginForm.email,loginForm.password).then(success=>{
  this.router.navigate(['/products']);
  // window.location.reload();
  
   
  }).catch(error=>{
    alert(error.message);
  });
  }

  loginWithGoogle() { 
    this.auth.loginWithGoogle().then(success=>{
      console.log("facebook login succcess")
      this.router.navigate(['/products']);
      // window.location.reload();
      
       
      }).catch(error=>{
        alert(error.message);
      });
  }
  loginWithFacbook(){
    this.auth.loginWithFb().then(success=>{
      
      this.router.navigate(['/products']);
      // window.location.reload();
      
       
      }).catch(error=>{
        alert(error.message);
      });
    
    
  }
  resetPassword(){
    this.auth.resetPassword('');
  }


 

}
