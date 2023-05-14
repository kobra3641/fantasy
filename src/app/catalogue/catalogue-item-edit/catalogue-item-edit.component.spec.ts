import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueItemEditComponent } from './catalogue-item-edit.component';

describe('CatalogueItemEditComponent', () => {
  let component: CatalogueItemEditComponent;
  let fixture: ComponentFixture<CatalogueItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueItemEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
