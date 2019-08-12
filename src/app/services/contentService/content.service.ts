import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Subscription} from 'apollo-angular';
import {Observable} from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ContentService extends Subscription {
  data: any
  ContentId: String;
  iterable: Boolean;
  QUERY_CONTENT_TYPE = gql` query contentType($name: String){
    contentType(name: $name){
      iterable
    }
  }
  `
  QUERY_CONTENT = gql`query content($id: ID!){
    content(id: $id){
      iterable
      id texts{
        id
        inputTypeName,
        inputTypeValue
      }
      richTexts{
        id
        inputTypeName
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
  MUTATION_UPDATE_RICH_TEXT = gql`
    mutation updateRichText($id: ID! $inputTypeName: String $inputTypeValue: String){
      updateRichText(id: $id, inputTypeName: $inputTypeName, inputTypeValue: $inputTypeValue){
        id
      }
    }
  `
  MUTATION_UPDATE_TEXT = gql`
    mutation updateText($id: ID! $inputTypeName: String $inputTypeValue: String){
      updateText(id: $id, inputTypeName: $inputTypeName, inputTypeValue: $inputTypeValue){
        id
      }
    }
  `
  MUTATION_ADD_TEXT = gql`
    mutation addTextToContent($contentId: ID! $inputTypeName: String $inputTypeValue: String){
      addTextToContent(contentId: $contentId, inputTypeName: $inputTypeName, inputTypeValue: $inputTypeValue){
        id
      }
    }`
  MUTATION_ADD_RICH_TEXT = gql`
    mutation addRichTextToContent($contentId: ID! $inputTypeName: String $inputTypeValue: String){
      addRichTextToContent(contentId: $contentId, inputTypeName: $inputTypeName, inputTypeValue: $inputTypeValue){
        id
      }
    }`
  MUTATION_CREATE_AREA =gql`
    mutation createContentArea($pageName: String, $areaName: String, $iterable: Boolean){
      createContentArea(pageName: $pageName, areaName: $areaName, iterable: $iterable){
        id
      }
    }
  `
  MUTATION_ADD_CONTENT_TO_AREA = gql`
    mutation addContentToArea($contentTypeName: String, $areaId: ID!){
      addContentToArea(contentTypeName: $contentTypeName, areaId: $areaId){
        id
      }
    }
  `;
  MUTATION_ORDER_CONTENT = gql`
    mutation updateContentArea($areaId: ID, $order: Int){
      updateContentArea(areaId: $areaId, order: $order){
        order
      }
    }
  `;
  addTextToContentTemplateArea = (templateAreaId, typeName, typeValue) => {
    return this.apollo.mutate({
      mutation: this.MUTATION_ADD_TEXT,
      variables: {
        contentId: templateAreaId,
        inputTypeName: typeName,
        inputTypeValue: typeValue
      }
    }).pipe(map(({data}) => data));
  }
  updateOrder(id, order): Observable <any> {
     console.log(id, order)
     return this.apollo.mutate({
       mutation: this.MUTATION_ORDER_CONTENT,
       variables: {
         areaId: id,
         order: order
       }
     }).pipe(map(({data, loading}) => {
       if (loading) { return loading; }
      console.log(data)
       // console.log('promise in filterImages', data);
       return data;
     }));
  }
    addContentToIterable(areaId, contentTypeName): Observable<any> {
     console.log(areaId, contentTypeName);
       return this.apollo.mutate({
         mutation: this.MUTATION_ADD_CONTENT_TO_AREA,
         variables: {
           areaId: areaId,
           contentTypeName: contentTypeName
         }
       }).pipe(map(({data}) => data));
    }
    updateContent(textId, typeName, typeValue): Observable<any>{
      return  this.apollo.mutate({
        mutation: this.MUTATION_UPDATE_TEXT,
        variables: {
          id: textId,
          inputTypeName: typeName,
          inputTypeValue: typeValue
        }
      }).pipe(map(({data, loading, err}) => {
        if (err) { console.log(err); }
        if (loading) { return loading; }
        console.log(data);
        return data;
      }));
    }
      addTheTextToTheContent(pageName, contentTypeName, contentId, typeValue, typeName, textId, input): Observable<any> {
     // console.log(pageName, contentId, typeValue, typeName, textId)
        if (!contentId) {
       // console.log('this got hit theres not contentID sent', contentTypeName)
            return this.apollo.mutate({
              mutation: this.MUTATION_CREATE_AREA,
              variables: {
                pageName: pageName,
                areaName: contentTypeName,
                iterable: this.iterable
              }
            })
              .pipe(flatMap(({data}) => {
              // console.log(data.createContentArea.id);
              return this.apollo.mutate({
                mutation: this.MUTATION_ADD_CONTENT_TO_AREA,
                variables: {
                  areaId: data.createContentArea.id,
                  contentTypeName: contentTypeName
                }
              })
                .pipe(flatMap(({data}) => {
                  this.ContentId = data.addContentToArea.id
                  // console.log('typeName on the create new area', data.addContentToArea.id)
                  let mutation
                  switch (input) {
                    case 'TEXT':
                      mutation = this.MUTATION_ADD_TEXT;
                      break
                      case 'RICH_TEXT':
                        mutation = this.MUTATION_ADD_RICH_TEXT;
                  }
                  console.log(input)
                    return this.apollo.mutate({
                      mutation: mutation,
                      variables: {
                        contentId: data.addContentToArea.id,
                        inputTypeName: typeName,
                        inputTypeValue: typeValue
                      }
                    }).pipe(map(({data, loading, err}) => {
                      console.log('final pipe', this.ContentId)
                      if (err) console.log(err);
                      if (loading) return loading;
                      return {
                        data,
                        contentId: this.ContentId
                      };
                    }));
              }));
            }));
        }
    if (textId) {
      let mutation;
      console.log(input)
      switch (input) {
        case 'TEXT':
          mutation = this.MUTATION_UPDATE_TEXT;
          break
        case 'RICHTEXT':
          mutation = this.MUTATION_UPDATE_RICH_TEXT;
      }
      return  this.apollo.mutate({
        mutation: mutation,
        variables: {
          id: textId,
          inputTypeName: typeName,
          inputTypeValue: typeValue
        }
      }).pipe(map(({data, loading, err}) => {
        if (err) { console.log(err); }
        if (loading) { return loading; }
        console.log(data);
        return data;
      }));
    } else {

      let mutation
      switch (input) {
        case 'TEXT':
          mutation = this.MUTATION_ADD_TEXT;
          break;
        case 'RICH_TEXT':
          mutation = this.MUTATION_ADD_RICH_TEXT;

      }
       console.log(typeName);
      return this.apollo.mutate( {
        mutation: mutation,
        variables: {
          contentId: contentId,
          inputTypeName: typeName,
          inputTypeValue: typeValue
        }
      }).pipe(map(({data, loading, err}) => {
        if (err) { console.log(err); }
        if (loading) { return loading; }
        console.log(data);
        return data;
      }));
    }
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
  fetchInputOnContentType (id, typeName): Observable<any> {
     console.log(typeName)
     this.apollo.watchQuery({
       query: this.QUERY_CONTENT_TYPE,
       variables: {
         name: typeName
       }
     }).valueChanges.subscribe(({data}) => {
       this.data = data
       this.iterable =  this.data.contentType.iterable;

     });
    return this.apollo.watchQuery({
      query: this.QUERY_INPUT_OF_CONTENT_TYPE,
      variables: {
        contentTypeId: id,
        contentTypeName: typeName
      }
    }).valueChanges.pipe(map(({data}) => data));;
  }
}
