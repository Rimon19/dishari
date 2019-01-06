import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  messageSource=new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  constructor() { }


}
