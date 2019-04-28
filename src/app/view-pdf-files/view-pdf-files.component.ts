import { ActivatedRoute } from '@angular/router';
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
    private fileUploadServic:FileUploadService,private route: ActivatedRoute) {

    this.url=this.route.snapshot.paramMap.get('url');
      
         
    }

  ngOnInit() {
   
  }

  


}
