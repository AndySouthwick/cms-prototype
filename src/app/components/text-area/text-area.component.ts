import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
  @Output() dataOut: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;
  constructor() { }

  getStringForTextArea(e: any): void {
    this.dataOut.emit(e);
  }
  ngOnInit() {
  }

}
