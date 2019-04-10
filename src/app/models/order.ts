import { ShoppingCart } from './shopping-cart';

export class Order { 
  datePlaced: number;
  searchDate; 
  items: any[];
  status:string;

  //this is old version of application
  // constructor(public userId: string, public shipping: any,
  //   shoppingCart: ShoppingCart,public  itemsTotalPrice:number,public totalItemsCount:number) {
  //  this.datePlaced = new Date().getTime();
  //  ){}

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
          price: i.price,
          key:i.$key,
          titleInBangla:i.titleInBangla,
          imageUrl: i.imageUrl,         
          bookPdfUrl:i.bookPdfUrl,
          category: i.category,  
          condition:i.condition,
          author:i.author,  
         // writter:i.writter,
         // publication:i.publication,
        

        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })    
  }

  

}