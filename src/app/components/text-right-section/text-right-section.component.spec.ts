import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRightSectionComponent } from './text-right-section.component';

describe('TextRightSectionComponent', () => {
  let component: TextRightSectionComponent;
  let fixture: ComponentFixture<TextRightSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextRightSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
