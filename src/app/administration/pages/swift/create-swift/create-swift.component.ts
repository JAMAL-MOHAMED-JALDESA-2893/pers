import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-swift',
  templateUrl: './create-swift.component.html',
  styleUrls: ['./create-swift.component.scss']
})
export class CreateSwiftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          console.log("base 64", imgBase64Path);
          
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

}
