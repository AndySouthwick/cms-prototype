import { Component, OnInit } from '@angular/core';
import {PagesService} from '../../services/pagesService/pages.service';
import {TemplateAreaService} from '../../services/templateAreaService/template-area.service';
import {ContentService} from '../../services/contentService/content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-template-area-creator',
  templateUrl: './template-area-creator.component.html',
  styleUrls: ['./template-area-creator.component.scss']
})
export class TemplateAreaCreatorComponent implements OnInit  {
  routeParams: Object;
  pageArray: Array<any>;

  constructor(
   private pages: PagesService,
   private template: TemplateAreaService,
   private content: ContentService,
   private activeRoute: ActivatedRoute,
   private router: Router,
  ) {
  }
  fetchPageTitles = () => {
    this.pages.fetchAllPage().subscribe(x => {
      console.log(x);
    });
  }

  createTemplateArea = (e) => {
   this.template.createTemplateArea(e.target.value).subscribe(x => {
     console.log('from template area function', x);
     this.template.addContentToTemplateArea(x).subscribe(y => {
       console.log('contentObject for template are content', y);
     });
   });
  }

  addContentToTemplateArea = () => {

  }

  ngOnInit() {
    this.routeParams = this.activeRoute.snapshot.params;
    console.log(this.routeParams)
    this.fetchPageTitles();
  }

}
