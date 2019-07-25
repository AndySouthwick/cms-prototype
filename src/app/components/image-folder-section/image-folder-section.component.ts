import { Component, OnInit, OnDestroy } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ImageService} from '../../services/copyImageService/image.service';

@Component({
  selector: 'app-image-folder-section',
  templateUrl: './image-folder-section.component.html',
  styleUrls: ['./image-folder-section.component.scss']
})
export class ImageFolderSectionComponent implements OnInit, OnDestroy {
  // @Input data: any
  folderSelected: Boolean
  singleImageDetails: any
  result: any;
  state: any
  selectedArea: String
  private sub: any;
  constructor(private imageService: ImageService) {
    this.state = {};
  }
  // this.state.name = ''
  // this.singleImageDetails = {};
  // return this.result = this.result.filterImagesByDimensions;

  singleItemDetails = (details) => {
   this.singleImageDetails = details;
  }
  filterImages = (e) => {
      this.selectedArea = e
  console.log('crom filter images', this.imageService.filterImages(e))
    const observer = this.imageService.filterImages(e);
    observer.subscribe({
      next: x => {
        this.result = x;
      },
      error: err => console.error('something wrong occurred: ' + err),
      complete: () => console.log('done'),
    });
    this.singleImageDetails = {};
    this.state.alert = {};
    this.state.name = '';
  }
  copyMessage(val: string) {
    console.log('copy message')
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.state.alert = {
      alertClass: 'alert-large-success',
      alertType: 'Success',
      alert: `You Copied An Image`,
    };
    console.log(this.state.alert)
    setTimeout(() => {
      this.state.alert = {};
    }, 3000);
  }

  ngOnInit() {
    // this.filterImages(this.selectedArea)
    if (!this.folderSelected) {
      this.state.name = 'No Folder Selected';
    }
  }
  ngOnDestroy() {
    // this.result.unsubscribe();
  }
}
