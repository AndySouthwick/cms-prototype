import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const sendCreds = gql`
  mutation loginUser($userName: String!, $password: String!){
  loginUser(email: $userName, hashed: $password){
  token
  }
  }`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo) {}
  mutationSendLoginCreds = (creds) => {
    console.log(creds);
   return this.apollo.mutate({
      mutation: sendCreds,
      variables: {
        userName: creds.email,
        password: creds.password
      }
    }).subscribe(({ data }) => {
      console.log(data);
      localStorage.setItem('token', data.loginUser.token);
    },
     err => console.log(err)
     );
  }
}
