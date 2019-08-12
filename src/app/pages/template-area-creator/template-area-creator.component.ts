import { Component, OnInit } from '@angular/core';
import {PagesService} from '../../services/pagesService/pages.service';
import {TemplateAreaService} from '../../services/templateAreaService/template-area.service';
import {ContentService} from '../../services/contentService/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ContentTypeService} from '../../services/contentTypeService/content-type.service';

@Component({
  selector: 'app-template-area-creator',
  templateUrl: './template-area-creator.component.html',
  styleUrls: ['./template-area-creator.component.scss']
})
export class TemplateAreaCreatorComponent implements OnInit  {
  routeParams: Object;
  templateAreas: any;
  pageArray: Array<any>;
  contentTypes: [];
  contentId: String;
  constructor(
    private pages: PagesService,
   private contentType: ContentTypeService,
   private template: TemplateAreaService,
   private content: ContentService,
   private activeRoute: ActivatedRoute,
   private router: Router,
  ) {}
  fetchPageTitles = () => {
    this.pages.fetchAllPage().subscribe(x => {
      console.log(x);
    });
  }
  fetchTemplateAreas = () => {
    this.template.queryTemplateAreas().subscribe(x => {
      console.log('these are template areas', x.templateAreas);
      this.templateAreas = x.templateAreas;
    },
      error => {
      console.log(error);
      });
  }
  fetchContentTypes = () => {
  this.contentType.queryFilteredTypes(false, false, true).subscribe(x => {
    this.content.fetchInputOnContentType(null, x.filteredContentTypes[0].typeName).subscribe(y => {
      console.log(y);
    })
    console.log(x.filteredContentTypes);
    this.contentTypes = x.filteredContentTypes;
  });
  }
  createTemplateArea = (e) => {
   this.template.createTemplateArea(e.target.value).subscribe(x => {
     console.log('from template area function', x);
       this.fetchTemplateAreas();
   });
  }
  updateContent = (id, label, e) => {
console.log(id, label, e.target.value);
this.content.updateContent(id, label, e.target.value).subscribe(x => {
  this.fetchTemplateAreas();
});
  }

  addContentToTemplateArea = (typeName, inputObject) => {
    console.log(typeName, inputObject);
    this.template.addContentToTemplateArea(typeName, this.templateAreas.id).subscribe(x => {
      inputObject.inputTypes.map(y => {
        this.content.addTextToContentTemplateArea(x.addContentToTemplateArea.id, y.label, '').subscribe();
      });
      console.log(x);
      this.contentId = x.addContentToTemplateArea.id;
      this.fetchTemplateAreas();
    });
  }

  ngOnInit() {
    this.routeParams = this.activeRoute.snapshot.params;
    this.fetchPageTitles();
    this.fetchTemplateAreas();
    this.fetchContentTypes();
  }

}
