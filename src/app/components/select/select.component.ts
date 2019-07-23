import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Output() dataOut: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

  getStringForSelected = (e) => {
    console.log(e);
    this.dataOut.emit(e);
  }
}
