import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-right-section',
  templateUrl: './text-right-section.component.html',
  styleUrls: ['./text-right-section.component.scss']
})
export class TextRightSectionComponent implements OnInit {
@Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
