import { Component, OnInit } from '@angular/core';
import {PagesService} from '../../services/pagesService/pages.service';
import {TemplateAreaService} from '../../services/templateAreaService/template-area.service';
import {ContentService} from '../../services/contentService/content.service';

@Component({
  selector: 'app-template-area-creator',
  templateUrl: './template-area-creator.component.html',
  styleUrls: ['./template-area-creator.component.scss']
})
export class TemplateAreaCreatorComponent implements OnInit  {

  constructor(
   private pages: PagesService,
   private template: TemplateAreaService,
   private content: ContentService
  ) {
  }
  fetchPageTitles = () => {
    this.pages.fetchAllPage().subscribe(x => {
      console.log(x);
    });
  }

  createTemplateArea = () => {

  }

  addContentToTemplateArea = () => {

  }

  ngOnInit() {
    this.fetchPageTitles();
  }

}
