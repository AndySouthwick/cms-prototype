import { Injectable } from '@angular/core';
import {Subscription} from 'apollo-angular';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService extends Subscription {
  // tslint:disable
  // document = gql `query componentsOnThePage($pageId: ID!) {
  //       componentsOnPage(pageId: $pageId, orderBy: componentOrderNum_ASC) {
  //       componentOrderNum
  //       id
  //       textCenterIs
  //      textCenterSection{
  //         title image content
  //       }
  //        textRightIs
  //      textRightSection{
  //         title image content
  //       }
  //       textLeftIs
  //        textLeftSection{
  //          image id title content
  //        }
  //        heroIs
  //       heroSlides {
  //        id img: image title subTitle buttonText buttonClass  buttonLink
  //         }
  //      cardIs
  //       cards{
  //       id image title blobInfo buttonClass buttonText
  //       }
  //       }
  //     }`

  // document = gql` query page($pageId: ID!) {
  //         page(pageId: $pageId){
  //           contentAreas{
  //             areaName
  //             content{
  //               id contentTypeName
  //               texts{
  //                 id inputTypeName inputTypeValue
  //               }
  //             }
  //           }
  //         }
  //     }`

  document = gql`query contentAreasOnPage($pageName: String $pageId: ID $orderBy: SortableField) {
    contentAreasOnPage(pageName: $pageName, pageId: $pageId, orderBy: $orderBy){
              id areaName order
      content{ 
        contentTypeName id
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
    isDashboard ? pollInterval = null : pollInterval = 1000;
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
