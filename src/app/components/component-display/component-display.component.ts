import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-component-display',
  templateUrl: './component-display.component.html',
  styleUrls: ['./component-display.component.scss']
})
export class ComponentDisplayComponent implements OnInit {
@Input()  data: any
  hero: any
  cards: any
  constructor() { }


  ngOnInit() {
    this.hero = this.data.hero;
    this.cards = this.data.cards;
    console.log('from component display', this.data);
  }

}
