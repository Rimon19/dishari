import { FileUploadService } from './../file-upload.service';
import { Upload } from './../models/file-upload';
import { PdfViewerService } from './../pdf-viewer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'view-pdf-files',
  templateUrl: './view-pdf-files.component.html',
  styleUrls: ['./view-pdf-files.component.scss']
})
export class ViewPdfFilesComponent implements OnInit {

  url;
  constructor(private pdfViewerService:PdfViewerService,
    private fileUploadServic:FileUploadService) {
       fileUploadServic.GetFileStorageMetadata('mouCV.pdf').then(metadata=>{
       //  this.url=metadata.bucket+'/'+metadata.fullPath;
        console.log(metadata);
       // console.log( this.url);
       });

    // fileUploadServic.GetDownloadLink('MousumiCvPdf.pdf').then(url=>{
    //  this.url=url;

    //  console.log('url:',this.url);
    // })
    fileUploadServic.GetDownloadLink('MousumiCvPdf.pdf').then(url=>{
      this.url=url;
      console.log(this.url);
    });
    
    }

  ngOnInit() {
    
  }

  


}
