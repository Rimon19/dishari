import { CellRequestService } from './../cell-request.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, query,  group } from '@angular/animations';
@Component({
  selector: 'app-my-cell-request',
  templateUrl: './my-cell-request.component.html',
  styleUrls: ['./my-cell-request.component.scss'],
  animations:[
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
export class MyCellRequestComponent implements OnInit {
  cellRequest$;
 // items;
  constructor(private authService: AuthService,private cellReq:CellRequestService) { 
    this.cellRequest$ = authService.user$.switchMap(u => cellReq.getOrdersByUser(u.uid));
 
  //   this.cellRequest$.subscribe(_items=> {
  //     this. items=_items;
  //  });
  }

  ngOnInit() {
  }

}
