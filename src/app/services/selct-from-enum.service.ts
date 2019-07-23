import { Injectable } from '@angular/core';

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
