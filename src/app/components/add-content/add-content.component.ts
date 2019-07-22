import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  public Editor = ClassicEditor;
  inputTypes: any;
  routeParams: any;
  inputArray: []
  contentId: String;
  constructor(private contentService: ContentService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }
  fetchFields = () => {
   this.routeParams = this.activeRoute.snapshot.params;


    const filterByInputType = (inputFromType, inputFromName) => {
      if (inputFromType === inputFromName) {
        return inputFromName;
      } else {
        return inputFromType;
      }
    }

    if (this.routeParams.contentId) {
        this.contentService.fetchInputOnContentType(null, this.routeParams.contentTypeName).subscribe(x => {
          // console.log(x)
          let inputTypeArray  = [];
          let inputArray = []
          x.inputTypesOfContentType.map(e => {
            // console.log(e)
            inputTypeArray = [...inputTypeArray, {inputTypeName: e.label, inputTypeValue: '', __typename: e.input}];
        });
          this.contentService.queryContent(this.routeParams.contentId).subscribe(y => {
            console.log('the content ', y)
            let textArray = [];
            let richTextArray = [];
            y.content.texts.map(e => {
              // console.log(e)
              textArray = [...textArray, e];

            });
            y.content.richTexts.map(richText => {
             richTextArray = [...richTextArray, richText];
            })
             inputArray = textArray.concat(richTextArray)
           let combinedArray = inputArray.concat(inputTypeArray);
           console.log(combinedArray);
            const distinctValues = Array.from(new Set(combinedArray.map(e => e.inputTypeName))).map(inputTypeName => {
              // console.log('find it', combinedArray.find(s => s.inputTypeName === inputTypeName).inputType);
              return {
                id: combinedArray.find(s => s.inputTypeName === inputTypeName).id,
                inputTypeName: inputTypeName,
                input: combinedArray.find(s => s.inputTypeName === inputTypeName).__typename,
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
            // console.log('merged and fire', merged)
            this.inputTypes = merged;
            // console.log('merged', this.inputTypes);
          });
      });

    } else {
      this.contentService.fetchInputOnContentType(null, this.routeParams.contentTypeName).subscribe(x => {
        this.inputTypes = x.inputTypesOfContentType;
         console.log( this.inputTypes);
      });
    }

  }
  sendUpMutation = (inputValue, inputName, inputId, input) => {
    // console.log(input.toUpperCase());
  if (!this.routeParams.contentId) {
    this.contentService.addTheTextToTheContent(this.routeParams.pageId, this.routeParams.contentTypeName, null, inputValue, inputName, inputId, input.toUpperCase())
      .subscribe(x => {
        console.log(x);
        return this.router.navigate(['/dashboard/add-edit/' + this.routeParams.pageId + '/' + this.routeParams.contentTypeName + '/' + x.contentId]);
      });
  }
    else {
      this.contentService.addTheTextToTheContent(this.routeParams.pageId, this.routeParams.contentTypeName, this.routeParams.contentId, inputValue, inputName, inputId, input.toUpperCase())
        .subscribe(x => {
           console.log(x);
        });
    }

  }
  sendUpMutationRich = ({ editor },  inputName, inputId, input) => {
  const data = editor.getData();

  // console.log( data, inputName, inputId );
    this.sendUpMutation(data, inputName, inputId, input);
}
  ngOnInit() {
   this.fetchFields();
    // console.log(this.routeParams.pageId);

  }

}
