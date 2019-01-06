import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MarchandAuthGuard implements CanActivate {


  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> { 
    
    return this.auth.appUser$
      .map(appUser => appUser.isMarchand);
      
  }
}
