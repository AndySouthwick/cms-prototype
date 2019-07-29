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
        id
      }
    }
  `
  ADD_CONTENT_TO_TEMPLATE_AREA = gql`
    mutation addContentToTemplateArea($areaId: ID!){
      id
    }
  `
  constructor() { }
  createTemplateArea(name): Observable<any> {
    this.apollo.mutate({
      mutation: this.CREATE_TEMPLATE_AREA,
      variables: {
        areaName: name
      }
    }).pipe(map(({data}) => data));
  }
  addContentToTemplateArea(areaId): Observable<any> {
    this.apollo.mutate({
      mutation: this.ADD_CONTENT_TO_TEMPLATE_AREA,
      variables: {
        areaId: areaId
      }
    }).pipe(map(({data}) => data));
  }
}
