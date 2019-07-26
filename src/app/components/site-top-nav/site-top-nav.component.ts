import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-site-top-nav',
  templateUrl: './site-top-nav.component.html',
  styleUrls: ['./site-top-nav.component.scss']
})
export class SiteTopNavComponent implements OnInit {
  data: Object
QUERY_TOP_NAV = gql`query {
  templateAreas{
    id areaName
    content{
      contentTypeName
      texts{
        inputTypeName inputTypeValue
      }
    }
  }
}`
  constructor(private apollo: Apollo) { }
  topNav: []
  queryTopNav = () => {
  this.apollo.watchQuery({
    query: this.QUERY_TOP_NAV
  }).valueChanges.subscribe(({data}) => {
    console.log('top nav log', data);
    this.rewriteDataObject(data);
  });
  }
  rewriteDataObject = (data) => {
    if (data.templateAreas[0].areaName === 'topNav') {
     let navArray = [];
     let contentObj = {};
      data.templateAreas[0].content.map((e) => {
        console.log(e.texts);
        e.texts.map((f) => {
          console.log(f);
          contentObj = {...contentObj, ...{[f.inputTypeName]: f.inputTypeValue}};
        });
        navArray = [...navArray, contentObj];
      });
  console.log(navArray);
  this.topNav = navArray;
    }
  }

  ngOnInit() {
  this.queryTopNav();

  }

}
