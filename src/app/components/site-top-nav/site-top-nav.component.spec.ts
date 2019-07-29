import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTopNavComponent } from './site-top-nav.component';

describe('SiteTopNavComponent', () => {
  let component: SiteTopNavComponent;
  let fixture: ComponentFixture<SiteTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
