import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Subscription} from 'apollo-angular';
import {Observable} from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagesService extends Subscription {
  data: any
   document =  gql`query {
    allPages {
      id title
    }
  }
`
  createPage = gql`mutation createDraft($title: String!, $id: ID!){
    createDraft(
      title: $title,
      userId: $id
    ){
      id title
    }
  }`;
 fetchContentTypes =  gql`query{allContentTypes{
    id typeName iterable
  }}
`

  queryContentTypes (): Observable<any> {
   return  this.apollo.watchQuery({
      query: this.fetchContentTypes
    }).valueChanges.pipe(map(({data}) => data));
  }
   createNewPage (title): Observable<any> {
     return this.apollo.mutate({
       mutation: this.createPage,
       variables: {
         title: title,
         id: 'cjygedbef001k0847vi3jd2yx'
       }
     }).pipe(map(({data}) => data));
  }
  fetchAllPage (): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.document,
    }).valueChanges.pipe(map(({data}) => data));
  }
}
