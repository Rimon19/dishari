import { trigger, transition, state, animate, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { fade, slide, bounceOutLeftAnimation, fadeInAnimation } from '../animation';
import { Component } from '@angular/core';


@Component({
  selector: 'app-todos-testing-purpose',
  templateUrl: './todos-testing-purpose.component.html',
  styleUrls: ['./todos-testing-purpose.component.scss'],
  animations: [
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('h1', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ]),
          query('@todoAnimation', 
            stagger(200, animateChild()))
        ])
      ])
    ]),

    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '2s'
          }
        })
      ]),
      transition(':leave', [
        style({ backgroundColor: '#ef5350' }),
        animate(500),
        useAnimation(bounceOutLeftAnimation)
      ]),
    ])
  ]
})
export class TodosTestingPurposeComponent {
  items: any[] = [
    'Wash the dishes', 
    'Call the accountant', 
    'Apply for a car insurance'];

  addItem(input: HTMLInputElement) {
    this.items.splice(0, 0, input.value);
    input.value = ''; 
  }

  removeItem(item) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  animationStarted($event) { console.log($event); }
  animationDone($event) { console.log($event); }
}
