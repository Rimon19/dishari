import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable ,timer,Subject} from 'rxjs';
import { TrendingsProducts1 } from './models/Trendings-Products';
import * as firebase from 'firebase/app';
import { interval } from 'rxjs/observable/interval';


@Injectable()
export class ProductService {
  p = new Product();
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

  deleteUpload(product: Product) {
    console.log('p s',product)
    this.deleteFileData(product.$key)
    .then( () => {
      let storageRef = firebase.storage().ref();
      storageRef.child(`uploads/Image/${product.imageUrlName}`).delete().then(t=>{
        storageRef.child(`uploads/Image/${product.imageUrl2Name}`).delete().then(t=>{
          storageRef.child(`uploads/Pdf/DemoPdf/${product.demoPdfUrlName}`).delete().then(t=>{
            storageRef.child(`uploads/Pdf/BooksPdfMain/${product.bookPdfUrlName}`).delete().then(t=>{
          
            })
          })
        })
      });
    })
    .catch(error => console.log(error));
  
  // console.log(product.imageUrl2Name);
  //   this.deleteFontImageFileStorage(product.imageUrlName);
  //     this.deleteBakendImageFileStorage(product.imageUrl2Name);
  //     this.deleteDemoPdfFileStorage(product.demoPdfUrlName);
  //     this.deleteBookPdfFileStorage(product.bookPdfUrlName);

      
  }

  
  private deleteFileData(key: string) {
    return this.db.list(`products/`).remove(key);
  }
 private   deleteFontImageFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`uploads/Image/${name}`).delete();
  }
  private deleteBakendImageFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`uploads/Image/${name}`).delete();
  }
  private deleteDemoPdfFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`uploads/Pdf/DemoPdf/${name}`).delete();
  }
 private deleteBookPdfFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`uploads/Pdf/BooksPdfMain/${name}`).delete();
  }

  getAllTrendingsProducts() {
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
      (snapshot) => {
      },
      (error) => {
        console.log(error)
      },
      (): any => {
        //upload success
        this.p.imageUrl = uploadTaskImageUrl.snapshot.downloadURL;
        this.p.imageUrlName = product.imageUrlFile.name;
        console.log("i",this.p.imageUrl);
        console.log('in',this.p.imageUrlName);
      }
    );

    //upload imageUrl2
    let uploadTaskImageUrl2 = storageRef
      .child(`uploads/Image/${product.imageUrl2File.name}`)
      .put(product.imageUrl2File);
    uploadTaskImageUrl2.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      },
      (error) => {
        console.log(error)
      },
      (): any => {
        this.p.imageUrl2 = uploadTaskImageUrl2.snapshot.downloadURL;
        this.p.imageUrl2Name = product.imageUrl2File.name;
        console.log("i2", this.p.imageUrl2 );
        console.log('i2n',this.p.imageUrl2Name);
      }

    );

    //upload demo pdf file
    let uploadTaskDemoPdf = storageRef
      .child(`uploads/Pdf/DemoPdf/${product.demoPdfFile.name}`)
      .put(product.demoPdfFile);
    uploadTaskDemoPdf.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      },
      (error) => {
        console.log(error)
      },
      (): any => {
        this.p.demoPdfUrl = uploadTaskDemoPdf.snapshot.downloadURL;
        this.p.demoPdfUrlName = product.demoPdfFile.name;
        console.log("d",this.p.demoPdfUrl);
        console.log('dn',this.p.demoPdfUrlName);
      }

    );


    //upload pdf file
    let uploadTaskBooksPdfMain = storageRef
      .child(`uploads/Pdf/BooksPdfMain/${product.bookPdfFile.name}`)
      .put(product.bookPdfFile);
    uploadTaskBooksPdfMain.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      },
      (error) => {
        console.log(error)
      },
      (): any => {
     
        this.p.bookPdfUrl = uploadTaskBooksPdfMain.snapshot.downloadURL;
        this.p.bookPdfUrlName = product.bookPdfFile.name;
        console.log('pdfurl',this.p.bookPdfUrl);
        console.log('pdfurlname',this.p.bookPdfUrlName );

        interval(20000);
      
        if(this.p.bookPdfUrl!=undefined&& this.p.bookPdfUrlName!=undefined){

          product.imageUrl = this.p.imageUrl;
          product.imageUrlName = this.p.imageUrlName;
          product.imageUrl2 = this.p.imageUrl2;
          product.imageUrl2Name = this.p.imageUrl2Name;
          product.demoPdfUrl = this.p.demoPdfUrl;
          product.demoPdfUrlName = this.p.demoPdfUrlName;
          product.bookPdfUrl=this.p.bookPdfUrl;
          product.bookPdfUrlName=this.p.bookPdfUrlName;
      
      
          console.log("push Upload obj", product);
          if( product.imageUrl!=undefined&&product.imageUrlName!=undefined&&
            product.imageUrl2!=undefined&&product.imageUrl2Name!=undefined&&
            product.demoPdfUrl!=undefined&&product.demoPdfUrlName!=undefined&&
            product.bookPdfUrl!=undefined&&product.bookPdfUrlName!=undefined
            &&
            product.imageUrl!=null&&product.imageUrlName!=null&&
            product.imageUrl2!=null&&product.imageUrl2Name!=null&&
            product.demoPdfUrl!=null&&product.demoPdfUrlName!=null&&
            product.bookPdfUrl!=null&&product.bookPdfUrlName!=null){
            
              this.saveFileData(product);
              console.log('saved!');
            }else{
              console.log('not saved!');
            }
      
        }
        
      
    
     
      }

    );
    
   
  }


  private saveFileData(p) {
   this.IsExistProductTitle(p.title).subscribe(s=>{
     if( s.length==0){
      this.db.list(`products/`).push(p);
      console.log("finaly saved");
     }else{
       console.log("title already exist"); 
     }
    
   });
  
  }


  IsExistProductTitle(title: string) {
    return this.db.list('/products', {
      query: {
        orderByChild: 'title',
        equalTo: title
      }
    });
  }

  IsExistFontImage(fontImageName: string) {
    return this.db.list('/products', {
      query: {
        orderByChild: 'imageUrlName',
        equalTo: fontImageName
      }
    });
  }

  IsExistBakendImage(bakendImageName: string) {
    return this.db.list('/products', {
      query: {
        orderByChild: 'imageUrl2Name',
        equalTo: bakendImageName
      }
    });
  }

  IsExistDemoPdfName(demoPdfName: string) {
    return this.db.list('/products', {
      query: {
        orderByChild: 'demoPdfUrlName',
        equalTo: demoPdfName
      }
    });
  }

  IsExistBookPdfName(bookPdfName: string) {
    return this.db.list('/products', {
      query: {
        orderByChild: 'bookPdfUrlName',
        equalTo: bookPdfName
      }
    });
  }

}
