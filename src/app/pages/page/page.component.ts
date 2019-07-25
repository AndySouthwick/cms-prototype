import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ComponentsService} from '../../services/componentsService/components.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  loadComponents: any;
  passComponents: any;
  id: string;

  constructor(private componentsService: ComponentsService,
              private activeRoute: ActivatedRoute) {
  }
  loadTheComponents(): void {
    const routeParams = this.activeRoute.snapshot.params;
    this.loadComponents = this.componentsService.fetchComponentDataForPage(routeParams.id, false)
      .subscribe(x => {
        console.log(x);
        let loadComponentsArray = [];
        x.contentAreasOnPage.map((contentArea) => {
          let loadComponent = [];
          let contentTypeName = ''
          contentArea.content.map((component) => {
            contentTypeName = component.contentTypeName
            let componentData;
            let text = {};
            let richText = {};
            component.texts.map((componentData) => {
              text = {...text, ...{[componentData.inputTypeName]: componentData.inputTypeValue}};
            });
            component.richTexts.map((componentData) => {
              richText = {...richText, ...{[componentData.inputTypeName]: componentData.inputTypeValue}};
            });
            componentData = {...text, ...richText}
            // console.log(richText)
            // console.log(componentText)
            loadComponent = [...loadComponent, componentData];
          });
          loadComponentsArray = [...loadComponentsArray, {[contentTypeName]: loadComponent}];
        });
        let passDataArray = [];
        passDataArray = [...passDataArray, loadComponentsArray];
        this.passComponents = passDataArray;
        console.log('component data', this.passComponents);
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

