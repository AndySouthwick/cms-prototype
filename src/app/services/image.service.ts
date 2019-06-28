import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {CopyImageToServerService} from './copy-image-to-server.service';
// tslint:disable

// tslint:enable
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  results: {}
  data: Observable<any>
  constructor(private apollo: Apollo,
              private copyImageToServerService: CopyImageToServerService){}
  queryImagesByDimensions = gql`
  query filterImagesByDimensions($filter: String){
    filterImagesByDimensions(filter: $filter){
      id imageUrl thumbnail imageDimensions altText
    }
  }
`

  document = gql`
  mutation createImage($imageUrl: String!, $altText: String!, $imageSizeOnly: ImageType ){
    createImage(
      imageUrl: $imageUrl
      altText: $altText
      imageSizeOnly: $imageSizeOnly
    ){
      id imageUrl altText imageDimensions
    }
  }
`
  filterImages = (filter) => {
    console.log('from filter', filter)
   return this.apollo.watchQuery({
      query: this.queryImagesByDimensions,
      variables: {
        filter: filter
      },
    }).valueChanges.pipe(map(({data, loading}) => {
      if (loading) { return loading; }
        // console.log('promise in filterImages', data);
        return data;
      }));
    //     .valueChanges.subscribe(({data, loading}) => {
    //   this.loading = loading;
    //   this.response = data.filterImagesByDimensions;
    //   console.log('from query', data);
    // });
    // console.log(this.response)
    // return this.response;

  }
  inputImageData = (e) => {
    this.results = {}
    const theFile =  e.file.target.value.replace(/C:\\fakepath\\/i, '')
   return this.apollo.mutate({
      mutation: this.document,
      variables: {
        imageUrl: theFile,
        altText: e.altText,
        imageSizeOnly: e.imageCompType,
      }
    }).pipe(map(({data, loading}) => {
     if (loading) { return loading; }
        this.copyImageToServerService.sendImageToImageServer(e);
        this.data = data
     // console.log('promise in filterImages', data);
     return  this.data;
   }));
   // subscribe(({data}) => {
   //    console.log('input image data', data)
   //    this.copyImageToServerService.sendImageToImageServer(e);
   //    console.log(data.createImage)
   //   return this.data = data.createImage;
   //  });
  }
}
