import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueFilterEditComponent } from './catalogue-filter-edit.component';

describe('CatalogueFilterEditComponent', () => {
  let component: CatalogueFilterEditComponent;
  let fixture: ComponentFixture<CatalogueFilterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueFilterEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueFilterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
