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

  document = gql`query contentAreasOnPage($pageId: ID! $orderBy: SortableField) {
    contentAreasOnPage(pageId: $pageId, orderBy: $orderBy){
              id areaName
      content{ 
        contentTypeName id
        texts{
          inputTypeName id inputTypeValue
        }
        }
          }
      }`
// tslint:enable
  fetchComponentDataForPage (page): Observable<any> {
   return this.apollo.watchQuery({
    pollInterval: 1000,
      query: this.document,
      variables: {
        pageId: page,
        orderBy: 'order_ASC'
      }
    }).valueChanges.pipe(map(({data}) => data));
  }
}
