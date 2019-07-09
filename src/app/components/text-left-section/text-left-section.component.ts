import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-left-section',
  templateUrl: './text-left-section.component.html',
  styleUrls: ['./text-left-section.component.scss']
})
export class TextLeftSectionComponent implements OnInit {
@Input() data: any
  constructor() { }

  ngOnInit() {
  console.log(this.data)
  }

}
