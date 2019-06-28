import { Component, OnInit, Output,  Input, EventEmitter, OnDestroy} from '@angular/core';
import {ImageService} from '../../services/image.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  @Input() name;
  @Output() dataOut: EventEmitter<any> = new EventEmitter<any>();
  fileDetails: {}
  fileNameTruncated: String;
  constructor(private imageService: ImageService,
              private modalService: BsModalService) { }

  updateFormObject = (value) => {
    return this.fileDetails = Object.assign( {...this.fileDetails}, value);
  }

   textTruncate = (str, length, ending) => {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }




  updateFile = e =>  {
    this.updateFormObject({file: e})
    this.fileNameTruncated = this.textTruncate(e, 24, ' ...');
  }

  updateAltText = e => this.updateFormObject({altText: e});
  updateImageCompType = e => this.updateFormObject({imageCompType: e});
  sendEvent = () => {
  const observer =  this.imageService.inputImageData(this.updateFormObject(null));
  observer.subscribe({
    next: x => {
    this.dataOut.next(x.createImage.imageDimensions);
    },
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
  });

    // this.dataOut.next(result);
  }
  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {
  }
 ngOnDestroy() {

 }
}
