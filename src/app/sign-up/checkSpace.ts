import { AbstractControl, ValidationErrors} from '@angular/forms';

export class checkSpace  {

 static canNotContainSpace(control:AbstractControl):ValidationErrors|null{
    if((control.value as string||"").indexOf(' ')>=0)
        return {canNotContainSpace:true};

    return null;
  }

// static passwordsShouldMatch(control: AbstractControl): ValidationErrors | null {
//     if(control.get(this.equalValidatorApp)!=null){
//       let password=control.parent.get(this.equalValidatorApp);
//       console.log(password);
//      if(password.value !== control.value){
//          return {passwordsShouldMatch: true};
//      }
//     }
   
//     // return null;
//     return {passwordsShouldMatch: false};
// }
}