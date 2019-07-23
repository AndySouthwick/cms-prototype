import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class SelctFromEnumService {
  QUERY_SELECT_VALUES = gql`
  query type($name: String!){
    __type(name: $name){
      enumValues{
        name
      }
    }
  }
`

  constructor() { }
}
