import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Subscription} from 'apollo-angular';
import {Observable} from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContentTypeService extends Subscription{

  FETCH_CONTENT_TYPES =  gql`query{ allContentTypes{
    id typeName iterable
  }}
  `
  FETCH_RELATIVE_CONTENT_TYPES = gql`query  filteredContentTypes($blog: Boolean, $content: Boolean, $template: Boolean){
    filteredContentTypes(
      blogArea: $blog,
      contentArea: $content,
      templateArea: $template
    ){
      id typeName iterable
      inputTypes {
        label
        help
        input
      }
    }
  }`

  queryFilteredTypes (blog, content, template): Observable<any> {
    return this.apollo.watchQuery({
      query: this.FETCH_RELATIVE_CONTENT_TYPES,
      variables: {
        blog: blog,
        content: content,
        template: template
      }
    }).valueChanges.pipe(map(({data}) => data));
  }

  queryContentTypes (): Observable<any> {
    return  this.apollo.watchQuery({
      query: this.FETCH_CONTENT_TYPES
    }).valueChanges.pipe(map(({data}) => data));
  }
}
