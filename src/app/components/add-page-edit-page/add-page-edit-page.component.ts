import { Component, OnInit } from '@angular/core';
import {PagesService} from '../../services/pages.service';
import {ComponentsService} from "../../services/components.service"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-page-edit-page',
  templateUrl: './add-page-edit-page.component.html',
  styleUrls: ['./add-page-edit-page.component.scss']
})
export class AddPageEditPageComponent implements OnInit {
  contentAreas: any;
  contentTypes: []
  routeParams: any

  constructor(private pageService: PagesService,
              private componentService: ComponentsService,
              private activeRoute: ActivatedRoute) { }

  dataFromForm = (e) => {
  this.pageService.createNewPage(e);
  }
  getContentAreasOnPage = () => {
    this.routeParams = this.activeRoute.snapshot.params;
    this.pageService.queryContentTypes().subscribe(x => {
      this.contentTypes = x.allContentTypes;
      console.log(this.contentTypes);
    });
    this.componentService.fetchComponentDataForPage(this.routeParams.pageId).subscribe(x => {
      console.log(x.contentAreasOnPage);
      this.contentAreas = x.contentAreasOnPage;

    });
  }

  ngOnInit() {
  this.getContentAreasOnPage();
  }
}
