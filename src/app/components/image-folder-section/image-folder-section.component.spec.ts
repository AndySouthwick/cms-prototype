import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFolderComponent } from './image-folder-section.component';

describe('ImageFolderComponent', () => {
  let component: ImageFolderComponent;
  let fixture: ComponentFixture<ImageFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
