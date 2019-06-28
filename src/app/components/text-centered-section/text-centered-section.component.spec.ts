import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCenteredSectionComponent } from './text-centered-section.component';

describe('TextCenteredSectionComponent', () => {
  let component: TextCenteredSectionComponent;
  let fixture: ComponentFixture<TextCenteredSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextCenteredSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextCenteredSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
