import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-centered-section',
  templateUrl: './text-centered-section.component.html',
  styleUrls: ['./text-centered-section.component.scss']
})
export class TextCenteredSectionComponent implements OnInit {
  @Input()  data: any
  constructor() { }

  ngOnInit() {
  }

}
