import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'usana-cms-proto';
  path: String;
  ngOnInit() {

    this.path = window.location.pathname;
    console.log(this.path);
  }
}
