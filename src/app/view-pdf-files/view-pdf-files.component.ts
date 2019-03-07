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
    this.url="https://firebasestorage.googleapis.com/v0/b/dishari-d2728.appspot.com/o/uploads%2FPdf%2FBooksPdfMain%2FAaaaB.pdf?alt=media&token=555229b8-df73-4e54-882d-8c0a031d7fe3"
  }

  


}
