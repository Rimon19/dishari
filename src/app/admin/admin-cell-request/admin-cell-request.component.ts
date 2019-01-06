import { OrderService } from './../../order.service';
import { CellRequestService } from './../../cell-request.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-admin-cell-request',
  templateUrl: './admin-cell-request.component.html',
  styleUrls: ['./admin-cell-request.component.scss']
})
export class AdminCellRequestComponent implements OnInit {

  cellRequest$;
  // items;
   constructor(private authService: AuthService,
    private cellReq:OrderService,
    private cellRequest:CellRequestService
  ) { 
  //its called from order service cause occuring error when its called from cell request service
   this.cellRequest$= cellReq.getAllCellRequest();
   
   //   this.cellRequest$.subscribe(_items=> {
   //     this. items=_items;
   //  });
   }
   BuyBook(buyedBook,bookId){
     
     buyedBook.status='selled';
     this.cellRequest.update(buyedBook,bookId)
   }
   cancelRequest(buyedBook,bookId){
     
    buyedBook.status='not sell';
    this.cellRequest.update(buyedBook,bookId)
  }
  ngOnInit() {
  }

}
