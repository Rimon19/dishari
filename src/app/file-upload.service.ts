import { Upload } from './models/file-upload';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
 
  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;
 
  constructor(private af: AngularFireModule, 
    private db: AngularFireDatabase) { }


 
  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef
    .child(`${this.basePath}/${upload.file.name}`)
    .put(upload.file);
    

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
     
        // upload in progress
    //    upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
       },
       () :any=> {
        //upload success
          upload.url = uploadTask.snapshot.downloadURL
          upload.name = upload.file.name

         this.saveFileData(upload)
        }
      
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  
  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }


  GetFileStorageMetadata(name:string) {
    let storageRef = firebase.storage().ref();
  return  storageRef.child(`${this.basePath}/${name}`).getMetadata();
 
  }

  GetDownloadLink(name:string) {
// Create a reference with an initial file path and name
var storage = firebase.storage();
var pathReference = storage.ref('uploads/mouCV.pdf');

// Create a reference from a Google Cloud Storage URI
var gsReference = storage.refFromURL('gs://dishari-d2728.appspot.com/uploads/mouCV.pdf')

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/dishari-d2728.appspot.com/o/uploads%2FmouCV.pdf?alt=media&token=8fc211dd-6bf3-4d6a-b53c-0f95ad6711bf');

//return httpsReference
    let storageRef = firebase.storage().ref();
   return storageRef.child(`${this.basePath}/${name}`).getDownloadURL();
    
  }

}


