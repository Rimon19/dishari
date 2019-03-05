import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from './models/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'; 

@Injectable()
export class UserService {
  
  userData:any;
  

  constructor(private db: AngularFireDatabase,private af:AngularFireAuth) {
    this.userData=firebase.database().ref('/users');
   }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

   signUp(registrationForm){
   return this.af.auth
   .createUserWithEmailAndPassword(registrationForm.email,
    registrationForm.password).then( newUser => {
      this.userData.child(newUser.uid).update({
        fullName: registrationForm.name,
        email: registrationForm.email,
        password: registrationForm.password,
        mobileNumber:registrationForm.mobileNumber
      });
    });
   }

  get(uid: string): FirebaseObjectObservable<AppUser> { 
    return this.db.object('/users/' + uid);
  }
  
}
