import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ComponentsService} from '../../services/components.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  loadComponents: any;
  passComponents: any;
  id: string;
  private sub: any;

  constructor(private componentsService: ComponentsService,
              private activeRoute: ActivatedRoute) {
  }
  loadTheComponents(): void {
    const routeParams = this.activeRoute.snapshot.params;
    this.loadComponents = this.componentsService.fetchComponentDataForPage(routeParams.id)
      .subscribe(x => {
        console.log(x);
        let loadComponentsArray = [];
        x.contentAreasOnPage.map((contentArea) => {
          let loadComponent = [];
          let contentTypeName = ''
          contentArea.content.map((component) => {
            contentTypeName = component.contentTypeName
            let componentText = {};
            component.texts.map((componentData) => {
              componentText = {...componentText, ...{[componentData.inputTypeName]: componentData.inputTypeValue}};
            });
            loadComponent = [...loadComponent, componentText];
          });
          loadComponentsArray = [...loadComponentsArray, {[contentTypeName]: loadComponent}];
        });
        let passDataArray = [];
        passDataArray = [...passDataArray, loadComponentsArray];
        this.passComponents = passDataArray;
        console.log(this.passComponents);
      },
        err => {
        console.log(err);
        });
  }
  ngOnInit() {
    this.loadTheComponents();
  }
  ngOnDestroy() {
    this.loadComponents.unsubscribe();
  }
}

