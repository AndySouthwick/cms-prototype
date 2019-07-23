import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() dataOut: EventEmitter<any> = new EventEmitter<any>();
  @Input() data;

  constructor() { }

  getStringForInput(e: any): void {
    this.dataOut.emit(e);
  }
  removeIcon = () => {
    this.data.icon = ""
    this.data.textInputClass = "default"
  }

  ngOnInit() {
  }

}
