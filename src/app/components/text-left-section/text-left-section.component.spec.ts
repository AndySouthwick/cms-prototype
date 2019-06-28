import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLeftSectionComponent } from './text-left-section.component';

describe('TextLeftSectionComponent', () => {
  let component: TextLeftSectionComponent;
  let fixture: ComponentFixture<TextLeftSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLeftSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLeftSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
