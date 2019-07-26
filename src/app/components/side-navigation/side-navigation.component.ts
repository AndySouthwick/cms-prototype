import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {
  navToggle: String
  barsToggle: String
  constructor() { }

  navClicked = (show) => {
    if (show) {this.navToggle = ''; this.toggle = false; }
    if (!show) {this.navToggle = 'hide';  this.toggle = true; }

  }

  ngOnInit() {
    this.navToggle = 'hide';
  }

}
