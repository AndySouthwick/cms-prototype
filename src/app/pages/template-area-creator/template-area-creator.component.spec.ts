import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAreaCreatorComponent } from './template-area-creator.component';

describe('TemplateAreaCreatorComponent', () => {
  let component: TemplateAreaCreatorComponent;
  let fixture: ComponentFixture<TemplateAreaCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAreaCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAreaCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
