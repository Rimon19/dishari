 import {trigger, state, animate, style, transition} from '@angular/animations';

export let fade= trigger('fade',[
  state('void',style({opacity:0})),
   transition(':enter,:leave',[
     animate(2000)
   ])
 ])


 export let slide=trigger('slide', [
  state('void',style({opacity:0})),
  
  transition(':enter', [ 
    style({opacity:'0', transform: 'translateX(-10px)'}),
    animate('0.5sm ease-in', style({transform: 'translateX(-100%)'}))
  ]),
  transition(':leave', [  
    animate('0.5sm ease-in', style({transform: 'translateX(-100%)'}))
  ])
]);

 export function moveIn() {
     return trigger('moveIn', [
         state('void', style({position:'fixed', width:'100%'}) ),
         state('*', style({position:'fixed', width:'100%'}) ),
         transition(':enter', [  // before 2.1: transition('void => *', [
           style({opacity:'0', transform: 'translateX(100%)'}),
           animate('0.6s ease-in-out', style({opacity:'1',transform: 'translateX(0)'}))
         ]),
         transition(':leave', [  // before 2.1: transition('* => void', [
          style({opacity:'1',transform: 'translateX(0%)'}),
           animate('0.3s ease-in-out', style({opacity:'0',transform: 'translateX(-200px)'}))
         ])
      ]);
 }
// export function fallIn() {
//     return trigger('fallIn', [
//         // state('void', style({position:'fixed', width:'100%'}) ),
//         // state('*', style({position:'fixed', width:'100%'}) ),
//         transition(':enter', [  // before 2.1: transition('void => *', [
//           style({opacity:'0',transform: 'translateY(100%)'}),
//           animate('0.5s .2s ease-in-out', style({transform: 'translateX(0%)'}))
//         ]),
//         transition(':leave', [  // before 2.1: transition('* => void', [
//           style({transform: 'translateX(0%)'}),
//           animate('0.3s ease-in-out', style({opacity:'0',transform: 'translateY(-200%)'}))
//         ])
//       ]);
// }


// export function moveInLeft() {
//     return trigger('moveInLeft', [
//         // state('void', style({position:'fixed', width:'100%'}) ),
//         // state('*', style({position:'fixed', width:'100%'}) ),
//         transition(':enter', [  // before 2.1: transition('void => *', [
//           style({transform: 'translateX(-100px)'}),
//           animate('0.5s  .2s ease-in-out', style({opacity:'0',transform: 'translateX(0)'}))
//         ]),
//         transition(':leave', [  // before 2.1: transition('* => void', [
//           style({transform: 'translateX(0%)'}),
//           animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
//         ])
//       ]);
// }