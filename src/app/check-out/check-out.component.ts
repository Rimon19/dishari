import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { fade } from '../animation';
import { trigger, transition, animate, style, query,  group } from '@angular/animations';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  animations:[
    fade,
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('h1', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ])
        ])
      ])
    
    ])
  ]
})
export class CheckOutComponent implements OnInit{ 
  cart$: Observable<ShoppingCart>;
  
  constructor(private shoppingCartService: ShoppingCartService) {}
  
  async ngOnInit() { 
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
