import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemEditComponent } from './catalog-item-edit.component';

describe('CatalogItemEditComponent', () => {
  let component: CatalogItemEditComponent;
  let fixture: ComponentFixture<CatalogItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
