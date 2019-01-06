
export class AppUser { 
  $key:string;
  name: string;
  email: string; 
  isAdmin: boolean;
  isMarchand:boolean;
  isActive:boolean;
  password:any;
  birthdate:any;
  gender:string;
  mobileNumber:string;
  //fullName property used for resolve error!
  fullName:string;
}