import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPageEditPageComponent } from './add-page-edit-page.component';

describe('AddPageEditPageComponent', () => {
  let component: AddPageEditPageComponent;
  let fixture: ComponentFixture<AddPageEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPageEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPageEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
