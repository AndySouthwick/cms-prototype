import { Injectable } from '@angular/core';
import {Subscription} from 'apollo-angular';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService extends Subscription {
  document = gql`query contentAreasOnPage($pageName: String $pageId: ID $orderBy: SortableField){
    contentAreasOnPage(pageName: $pageName, pageId: $pageId, orderBy: $orderBy){
      id areaName order iterable
      content {
        contentTypeName id iterable
        texts{
          inputTypeName id inputTypeValue
        }
        richTexts{
          inputTypeName id inputTypeValue
        }
        }
          }
      }`
// tslint:enable
  fetchComponentDataForPage (page, isDashboard): Observable<any> {
    let pollInterval
    isDashboard ? pollInterval = null : pollInterval = 5000;
   return this.apollo.watchQuery({
     pollInterval: pollInterval,
      query: this.document,
      variables: {
        pageName: page,
        orderBy: 'order_ASC'
      }
    }).valueChanges.pipe(map(({data}) => data));
  }
}
