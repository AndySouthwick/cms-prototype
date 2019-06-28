import { Component, OnInit, AfterViewChecked } from '@angular/core';
import * as BaloonEditor from '@ckeditor/ckeditor5-build-balloon';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config: Object
  public Editor = BaloonEditor;

  constructor() { }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  ngOnInit() {
    this.config = {
      toolbar: [ 'heading', '|', 'bold', 'italic' ]
     };
    }
  }


