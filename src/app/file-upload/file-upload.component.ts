import { Upload } from './../models/file-upload';
import { FileUploadService } from './../file-upload.service';
import { Component, OnInit } from '@angular/core';

import * as _ from "lodash";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;

 
  constructor(private upSvc: FileUploadService) { }
 
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
  
}
