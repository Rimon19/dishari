import { FormControl, FormGroup, NgForm,
    FormGroupDirective, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
 import { Directive, Input } from '@angular/core';
 
 
    @Directive({
     selector: '[equalValidatorApp]',
     providers:[{
       provide:NG_VALIDATORS,
       useExisting:ValidatePassword,
       multi:true
     }]
   })

   export class ValidatePassword  implements Validator{
    @Input()equalValidatorApp:string;
       validate(control:AbstractControl):{[key:string]:any}|null{

        const controlTobeCompare=control.parent.get(this.equalValidatorApp);
       
       
        if(controlTobeCompare&&controlTobeCompare.value!==control.value){
            return {'notEqual':true}
        }
        return null;
       }
    

   }