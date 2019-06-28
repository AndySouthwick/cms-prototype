import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Subscription} from 'apollo-angular';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ContentTypesService extends Subscription {
   QUERY_CONTENTY_TYPES =  gql`
  {allContentTypes{
    id typeName
  }
  }
`
  QUERY_CONTENT = gql`query content($id: ID!){
    content(id: $id){
      id texts {
        id
        inputTypeName,
        inputTypeValue
      }
    }
  }`
   QUERY_INPUT_OF_CONTENT_TYPE = gql`
  query inputTypesOfContentType($contentTypeId: ID $contentTypeName: String){
    inputTypesOfContentType(contentTypeId: $contentTypeId, contentTypeName: $contentTypeName){
      id label help input
    }
  }`

  MUTATION_ADD_CONENT = gql`
    mutation updateText($id: ID! $inputTypeName: String $inputTypeValue: String){
      updateText(id: $id, inputTypeName: $inputTypeName, inputTypeValue: $inputTypeValue){
        id
      }
    }
  `
  addTheTextToTheContent  = (contentId, typeValue, typeName, textId) => {
     console.log(contentId, typeName, typeValue, textId)
   return  this.apollo.mutate({
       mutation: this.MUTATION_ADD_CONENT,
       variables: {
         id: textId,
         inputTypeName: typeName,
         inputTypeValue: typeValue
       }
     }).subscribe(({data, loading, err}) => {
     if (err) { console.log(err); }
       if (loading) { return loading; }
       console.log(data);
       return data;
     });
  }
  queryContent (id): Observable<any> {
     console.log(id)
     return this.apollo.watchQuery({
       query: this.QUERY_CONTENT,
       variables: {
         id: id
       }
     }).valueChanges.pipe(map(({data}) => data));;
  }
  queryContentTypes (): Observable<any> {
    return  this.apollo.watchQuery({
      query: this.QUERY_CONTENTY_TYPES
    }).valueChanges.pipe(map(({data}) => data));
  }

  fetchInputOnContentType (id, typeName): Observable<any> {
    return this.apollo.watchQuery({
      query: this.QUERY_INPUT_OF_CONTENT_TYPE,
      variables: {
        contentTypeId: id,
        contentTypeName: typeName
      }
    }).valueChanges.pipe(map(({data}) => data));;
  }
}
