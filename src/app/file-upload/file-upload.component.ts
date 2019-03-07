import { Upload } from './../models/file-upload';
import { FileUploadService } from './../file-upload.service';
import { Component, OnInit } from '@angular/core';

import * as _ from "lodash";
import { ShippingForm } from '../models/shipping-form';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;
  shipping=new ShippingForm();
 
  constructor(private upSvc: FileUploadService,
    private productService:ProductService) { }
 
  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
}

uploadSingle() {
  let file = this.selectedFiles.item(0);
  console.log(file);
  this.currentUpload = new Upload(file);
  
//  this.upSvc.pushUpload(this.currentUpload)
}
  
    uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      console.log(this.currentUpload);
      this.upSvc.pushUpload(this.currentUpload)}
    )
  }

  deleteFromStorage(obj){
    console.log(obj);
    if(obj.mobileNo!=undefined&&obj.mobileNo){
      this.productService.deleteFontImageFileStorage(obj.mobileNo);
     
    }
    if(obj.transactionNo!=undefined&&obj.transactionNo){
      this.productService.deleteDemoPdfFileStorage(obj.transactionNo);

    }
    if(obj.addressLine2!=undefined&&obj.addressLine2){
      this.productService.deleteBookPdfFileStorage(obj.addressLine2);
     
    }
    
   
    


  }
  
}
