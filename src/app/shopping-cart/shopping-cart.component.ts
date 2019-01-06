import { trigger, transition, animate, style, query,  group } from '@angular/animations';

import { ShoppingCartService } from '../shopping-cart.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
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
export class ShoppingCartComponent implements OnInit {
  cart$;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() { 
    this.shoppingCartService.clearCart();
  }
  animationStarted($event) {  }
  animationDone($event) {  }
}
