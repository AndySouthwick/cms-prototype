import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  @Input()  data: any
  @Output() dataOut: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  callParent() {
    this.dataOut.next(this.data.imageUrl);
  }

  ngOnInit() {
  }

}
