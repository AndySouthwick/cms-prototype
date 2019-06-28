import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss']
})
export class CardSectionComponent implements OnInit {
@Input() data: any
  constructor() {
    console.log('from card section', this.data);
  }

  ngOnInit() {
  }

}
