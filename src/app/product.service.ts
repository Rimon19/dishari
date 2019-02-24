import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { TrendingsProducts1 } from './models/Trendings-Products';
import * as firebase from 'firebase/app';
@Injectable()
export class ProductService {
   p=new Product();
  constructor(private db: AngularFireDatabase) { }

  create(product) { 
    return this.db.list('/products').push(product);
  }


  getAll(): Observable<Product[]> {
    return this.db.list('/products');
  }
  
  get(productId) { 
    return this.db.object('/products/' + productId);
  }

  update(productId, product) { 
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) { 
    return this.db.object('/products/' + productId).remove();
  }

  getAllTrendingsProducts(){
    return this.db.list('/TrendingsProducts');
  }


  getProducByUserId(userId: string) {
    return this.db.list('/products', {
      query: {
        orderByChild: 'uid',
        equalTo: userId        
      }
    });
  }

  pushUpload(product: Product) {
    let storageRef = firebase.storage().ref();
    //uploadimageurl
    let uploadTaskImageUrl = storageRef
    .child(`uploads/Image/${product.imageUrlFile.name}`)
    .put(product.imageUrlFile);    
    uploadTaskImageUrl.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
      },
      (error) => {
        console.log(error)
       },
       () :any=> {
        //upload success
          this.p.imageUrl = uploadTaskImageUrl.snapshot.downloadURL
          this.p.imageUrlName = product.imageUrlFile.name
        }     
    );

    //upload imageUrl2
     let uploadTaskImageUrl2 = storageRef
    .child(`uploads/Image/${product.imageUrl2File.name}`)
    .put(product.imageUrl2File);    
    uploadTaskImageUrl2.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
      },
      (error) => {
        console.log(error)
       },
       () :any=> {
        this.p.imageUrl2 = uploadTaskImageUrl2.snapshot.downloadURL
        this.p.imageUrl2Name = product.imageUrl2File.name
        
        }
      
    );

//upload demo pdf file
let uploadTaskDemoPdf = storageRef
.child(`uploads/Pdf/DemoPdf/${product.demoPdfFile.name}`)
.put(product.demoPdfFile);    
uploadTaskDemoPdf.on(firebase.storage.TaskEvent.STATE_CHANGED,
  (snapshot) =>  {
  },
  (error) => {
    console.log(error)
   },
   () :any=> {
    this.p.demoPdfUrl = uploadTaskDemoPdf.snapshot.downloadURL
    this.p.demoPdfUrlName = product.demoPdfFile.name    
    }
  
);


//upload pdf file
let uploadTaskBooksPdfMain = storageRef
.child(`uploads/Pdf/BooksPdfMain/${product.bookPdfFile.name}`)
.put(product.bookPdfFile);    
uploadTaskBooksPdfMain.on(firebase.storage.TaskEvent.STATE_CHANGED,
  (snapshot) =>  {
  },
  (error) => {
    console.log(error)
   },
   () :any=> {
     product.imageUrl=this.p.imageUrl;
     product.imageUrlName=this.p.imageUrlName;
     product.imageUrl2=this.p.imageUrl2;
     product.imageUrl2Name=this.p.imageUrl2Name;
     product.demoPdfUrl=this.p.demoPdfUrl;
     product.demoPdfUrlName=this.p.demoPdfUrlName;
      product.bookPdfUrl = uploadTaskBooksPdfMain.snapshot.downloadURL
      product.bookPdfUrlName = product.demoPdfFile.name

      console.log("push Upload obj",product);
      this.saveFileData(product);
    }
  
);





}
 

private saveFileData(p) {
  this.db.list(`books/`).push(p);
}

}
