import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Subscription} from 'apollo-angular';
import {Observable} from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TemplateAreaService extends Subscription {
  CREATE_TEMPLATE_AREA = gql`
    mutation createTempalteArea($areaName: String){
      createTemplateArea(areaName: $areaName){
        id, areaName
      }
    }
  `
  ADD_CONTENT_TO_TEMPLATE_AREA = gql`
    mutation addContentToTemplateArea($areaId: ID! $areaName: String){
      addContentToTemplateArea(areaId: $areaId, contentTypeName: $areaName){
        id
      }
    }
  `

  createTemplateArea (name):  Observable<any> {
    console.log(name)
  return this.apollo.mutate({
      mutation: this.CREATE_TEMPLATE_AREA,
      variables: {
        areaName: name
      }
    }).pipe(map(({data}) => data));
  }
  addContentToTemplateArea (areaId): Observable<any> {
    console.log(areaId.createTemplateArea.id)
   return this.apollo.mutate({
      mutation: this.ADD_CONTENT_TO_TEMPLATE_AREA,
      variables: {
        areaId: areaId.createTemplateArea.id,
        areaName: areaId.createTemplateArea.areaName
      }
    }).pipe(map(({data}) => data));
  }
}
