import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCreatorComponent } from './type-creator.component';

describe('TypeCreatorComponent', () => {
  let component: TypeCreatorComponent;
  let fixture: ComponentFixture<TypeCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
