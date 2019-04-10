import { Product } from './product';

export class ShoppingCartItem {
  $key: string;
  title: string;
  titleInBangla:string;
  price: number; 
  quantity: number; 

  imageUrl: string;
  imageUrl2:string;
  bookPdfUrl:string;
  category: string;
  author:string;
  //writter:string;
  publication:string;
  condition:string;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() { return this.price * this.quantity; }

}