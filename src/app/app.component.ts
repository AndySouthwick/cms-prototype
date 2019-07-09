import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routerParams: any
  constructor( private activeRoute: ActivatedRoute) {}
  title = 'usana-cms-proto';
  path: String;
  dashboardNav: Boolean;
  ngOnInit() {
    this.routerParams = this.activeRoute.snapshot.params;
    console.log(this.routerParams)
    this.path = window.location.pathname;
    console.log(this.path);
    if (this.path.match('/dashboard\*')) {
      this.dashboardNav = true;
    }
  }
}
