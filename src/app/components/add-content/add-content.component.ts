import { Component, OnInit } from '@angular/core';
import {ContentTypesService} from '../../services/content-types.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  inputTypes: any;
  routeParams: any;
  inputArray: []
  contentId: String;
  constructor(private contentTypesService: ContentTypesService,
              private activeRoute: ActivatedRoute) { }
  fetchFields = () => {
   this.routeParams = this.activeRoute.snapshot.params;



    const filterByInputType = (inputFromType, inputFromName) => {

      if (inputFromType === inputFromName) {
        console.log(inputFromName)
        return inputFromName;
      } else {
        console.log(inputFromType)
        return inputFromType;
      }
    }

    if (this.routeParams.contentId) {
        this.contentTypesService.fetchInputOnContentType(null, this.routeParams.contentTypeName).subscribe(x => {
          let inputTypeArray  = [];
          let inputArray = []
          x.inputTypesOfContentType.map(e => {
            inputTypeArray = [...inputTypeArray, {inputTypeName: e.label, inputTypeValue: ''}];
        });
          this.contentTypesService.queryContent(this.routeParams.contentId).subscribe(y => {
            y.content.texts.map(e => {
              inputArray = [...inputArray, e];

            });
           let combinedArray = inputArray.concat(inputTypeArray);
            const distinctValues = Array.from(new Set(combinedArray.map(e => e.inputTypeName))).map(inputTypeName => {
              return {
                id: combinedArray.find(s => s.inputTypeName === inputTypeName).id,
                inputTypeName: inputTypeName,
                inputTypeValue: combinedArray.find(s => s.inputTypeName === inputTypeName).inputTypeValue
              };
            })

            let inputTypeNameArray = []
            inputTypeArray.map(e => inputTypeNameArray = [...inputTypeNameArray, e.inputTypeName]);
            let newResult = []
            inputTypeNameArray.map(e => {
              let result = []
              distinctValues.filter( (distinctValues) => {
                if (distinctValues.inputTypeName === e) {
                  result = [...result, distinctValues];
                }
              });
              newResult = [...newResult, result];

            })

            const merged = [].concat.apply([], newResult);
            console.log('merged and fire', merged)
            this.inputTypes = merged;
          });
      });

    } else {
      this.contentTypesService.fetchInputOnContentType(null, this.routeParams.contentTypeName).subscribe(x => {
        this.inputTypes = x.inputTypesOfContentType;
        console.log(x);
      });
    }

  }
  sendUpMutation = (inputValue, inputName, inputId) => {
    this.contentTypesService.addTheTextToTheContent(this.routeParams.contentId, inputValue, inputName, inputId);
   console.log(inputValue, inputName,  this.routeParams.contentId, inputId);
  }
  ngOnInit() {
   this.fetchFields();
  }

}
