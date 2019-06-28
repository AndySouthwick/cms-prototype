import { Component, OnInit, OnDestroy } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

const CREATE_TYPE = gql`
  mutation createContentType($typeName: String){
    createContentType(typeName: $typeName){
      id typeName
    }
  }
`
const CREATE_INPUT = gql`
  mutation addInputTypeToContentType($contentTypeId: ID! $label: String $help: String $input: Input) {
    addInputTypeToContentType(
      contentTypeId: $contentTypeId,
      label: $label,
      help: $help,
      input: $input
    ){
      id label
    }
  }
`
const QUERY_CONTENTY_TYPES =  gql`
  {allContentTypes{
  id typeName
  }
  }
`
const QUERY_INPUT_OF_CONTENT_TYPE = gql`
  query inputTypesOfContentType($contentTypeId: ID!){
    inputTypesOfContentType(contentTypeId: $contentTypeId){
      id label help input
    }
  }`

const UPDATE_INPUT = gql`
  mutation updateInputType($inputTypeId: ID! $label: String $help: String $input: Input){
    updateInputType(
      inputTypeId: $inputTypeId,
      label: $label,
      help: $help,
      input: $input
    ){
      id label help input
    }
  }
`
@Component({
  selector: 'app-type-creator',
  templateUrl: './type-creator.component.html',
  styleUrls: ['./type-creator.component.scss']
})
export class TypeCreatorComponent implements OnInit, OnDestroy {
  data: any;
  newTypeCreated: Boolean;
  typeId: String;
  input: String;
  label: String;
  help: String;
  queryData: []
  allContentTypes: {};
  inputFromField: Boolean;
  selectedContentTypeName: String;
  alert: Boolean
  constructor(private apollo: Apollo) {

  }
  queryContentTypes = () => {
    this.apollo.watchQuery({
      query: QUERY_CONTENTY_TYPES
    }).valueChanges.subscribe(({data}) => {
      this.data = data
      this.allContentTypes = this.data.allContentTypes;
    });
  }
  updateType = (inputId) => {
    this.apollo.mutate({
      mutation: UPDATE_INPUT,
      variables: {
        inputTypeId: inputId,
        label: this.label,
        help: this.help,
        input: this.input
      }
    }).subscribe(({data}) => {
      this.data = data.updateInputType.id;
      // console.log(data.updateInputType.id)
    });
  }
  createTypeName = (inputFromField) => {
    this.label = '';
      this.help = '';
    this.input = '';
    if (inputFromField) {
      this.queryData = [];
      this.typeId = ''
      this.inputFromField = true
      this.apollo.mutate({
        mutation: CREATE_TYPE,
        variables: {
          typeName: inputFromField
        }
      }).subscribe(({data, loading}) => {
        if (data) {
          // console.log(data)
          this.typeId = data.createContentType.id
          this.selectedContentTypeName = inputFromField
          this.newTypeCreated = true;
          this.clearField('createTypeNameFunction');
        }
      });
    } else {
      this.inputFromField = false;
    }

  }
  queryInputTypesOfContentTypes = (id, typeName) => {
    this.selectedContentTypeName = typeName
    console.log(id)
    this.typeId = id
    this.apollo.watchQuery({
      query: QUERY_INPUT_OF_CONTENT_TYPE,
      variables: {
        contentTypeId: id
      }
    }).valueChanges.subscribe(({data}) => {
      this.data = data
      this.inputFromField = true
      this.queryData = this.data.inputTypesOfContentType;
      console.log(this.queryData);
    });
  }
  clearField = (location) => {
    switch (location) {
      case 'createNew':
        this.queryContentTypes()
        this.selectedContentTypeName = '';
        this.inputFromField = false;
        break;
      case 'createTypeNameFunction':
        this.queryData = []
        this.inputFromField = true
        break;
      default: return console.log('default');
    }
  }
  createLabel = input => this.label = input;
  createHelp = input =>  this.help = input;
  createInput = input => this.input = input;
  sendMutationUp = () => {
    console.log(this.label, this.help, this.input, this.typeId);
    this.apollo.mutate({
      mutation: CREATE_INPUT,
      variables: {
        contentTypeId: this.typeId,
        label: this.label,
        help: this.help,
        input: this.input
      }
    }).subscribe(({data, loading}) => {
      if (data) {
       this.apollo.watchQuery({
         query: QUERY_INPUT_OF_CONTENT_TYPE,
         variables: {
           contentTypeId: this.typeId
         }
       }).valueChanges.subscribe(({data}) => {
         this.data = data
         this.queryData = this.data.inputTypesOfContentType;
       });
      }
    }, error => console.log(error));
  }
  ngOnInit() {
  this.queryContentTypes();
  }
ngOnDestroy() {
}
}
