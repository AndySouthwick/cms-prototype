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



   createNewPage (title): Observable<any> {
     return this.apollo.mutate({
       mutation: this.createPage,
       variables: {
         title: title,
         id: 'cjyke7lqm001g08562pg4fbin'
       }
     }).pipe(map(({data}) => data));
  }
  fetchAllPage (): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.document,
    }).valueChanges.pipe(map(({data}) => data));
  }
}
