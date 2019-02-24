import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit,HostBinding  } from '@angular/core';
import 'jquery';
declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
})
export class AppComponent implements OnInit {
  show:boolean;
  constructor(private userService: UserService, private auth: AuthService, router: Router) {

    auth.user$.subscribe(user => {
      if (!user) return; 
      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return; 

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
    
  }
  ngOnInit() {

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    if(month==2){
      this.show=true;
    }else{
      this.show=false;
    }
}
}
