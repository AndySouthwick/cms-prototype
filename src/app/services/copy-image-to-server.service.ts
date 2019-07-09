import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ImageService} from './image.service';
@Injectable({
  providedIn: 'root'
})
export class CopyImageToServerService {
  httpHeader: {};
  fileName: String;

  constructor(private http: HttpClient) { }
  sendImageToImageServer = (e) => {
    const form = new FormData();
    form.append('fileName', e.file.target.files[0]);
    this.httpHeader = {
      params: {
        'clientFilename': 'file.name',
        'mimeType': 'file.type'
        ,
        data: form
      }
    },
      this.http.post('http://localhost:4001/',
        form,
        this.httpHeader,
      ).subscribe((res) => {
      console.log(res);
        },
        (err) => {
          console.log('err from 4000', err);
        });
  }
}
