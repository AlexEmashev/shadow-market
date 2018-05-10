import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteNotAllowedComponent } from './route-not-allowed.component';

describe('RouteNotAllowedComponent', () => {
  let component: RouteNotAllowedComponent;
  let fixture: ComponentFixture<RouteNotAllowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteNotAllowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteNotAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
