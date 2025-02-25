import { Component, OnInit, OnDestroy } from '@angular/core';
import {PagesService} from '../../services/pagesService/pages.service';
import {ComponentsService} from '../../services/componentsService/components.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ContentService} from '../../services/contentService/content.service';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import {ContentTypeService} from "../../services/contentTypeService/content-type.service"
@Component({
  selector: 'app-add-page-edit-page',
  templateUrl: './add-page-edit-page.component.html',
  styleUrls: ['./add-page-edit-page.component.scss']
})
export class AddPageEditPageComponent implements OnInit, OnDestroy {
  contentAreas: any;
  contentTypes: [];
  routeParams: any;
  data: any[];
  subs = new Subscription();
  constructor(private pageService: PagesService,
              private contenTypeService: ContentTypeService,
              private componentService: ComponentsService,
              private activeRoute: ActivatedRoute,
              private  contentService: ContentService,
              private router: Router,
              private dragulaService: DragulaService
  ) {
    this.subs.add(this.dragulaService.dragend("VAMPIRES").subscribe()
    );
  }



  save() {
    this.contentAreas.map((e, i) => {
      e.order = i + 1
      this.contentService.updateOrder(e.id, e.order).subscribe();
    });
    return this.getContentAreasOnPage();
  }

  dataFromForm = (e) => {
    console.log()
 this.pageService.createNewPage(e.target.value).subscribe(x => {
   console.log(x);
   return this.router.navigate(['/dashboard/add-edit/' + x.createDraft.title]);

 });
  }
  addNewItemToIterable = (area, areaName) => {
    this.contentService.addContentToIterable(area, areaName).subscribe(x => {
      console.log('it is it', area, areaName)
      console.log(x);
    return this.router.navigate(['/dashboard/add-edit/' + `${this.routeParams.pageId}` + '/' + areaName + '/' + x.addContentToArea.id]);
    });
  }
  getContentAreasOnPage = () => {
    this.routeParams = this.activeRoute.snapshot.params;
    this.contenTypeService.queryFilteredTypes(false, true, false).subscribe(x => {
      this.contentTypes = x.filteredContentTypes;
    });
    this.componentService.fetchComponentDataForPage( this.routeParams.pageId, true).subscribe(x => {
      this.contentAreas = x.contentAreasOnPage;
      console.log(this.contentAreas);
    });
  }

  ngOnInit() {
  this.getContentAreasOnPage();
  }
  ngOnDestroy() {
    this.dragulaService.destroy("VAMPIRES");
  }
}
