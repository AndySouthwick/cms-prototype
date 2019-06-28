import { Component, OnInit } from '@angular/core';
import {PagesService} from '../../services/pages.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pageData: {};

  constructor(private pageService: PagesService) {
  }

  ngOnInit() {
    this.pageService.fetchAllPage().subscribe(x => {
      console.log('hit this');
      this.pageData = x.allPages;

    });
  }

}
