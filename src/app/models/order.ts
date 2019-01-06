import { ShoppingCart } from './shopping-cart';

export class Order { 
  datePlaced: number;
  searchDate; 
  items: any[];
 

  constructor(public userId: string, public shipping: any,
     shoppingCart: ShoppingCart,public  itemsTotalPrice:number,public totalItemsCount:number) {
    this.datePlaced = new Date().getTime();
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
 
   this.searchDate = year+''+month+''+day;
  

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })    
  }
}