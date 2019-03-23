import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 
import * as firebase from 'firebase'; 

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
     private router:Router) { 
    this.user$ = afAuth.authState;    
  }

  loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   
  }
  loginWithFb() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

   return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
 
    
  }

  signIn(email,password){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
   
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
   
  } 


  logout() { 
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
       
        if (user)  localStorage.setItem("userUid",user.uid);
    
        if (user) return this.userService.get(user.uid);
         
        return Observable.of(null);
      });    
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail('')
      .then(() => console.log('sent Password Reset Email!'))
      .catch((error) => console.log(error))
  }
}
