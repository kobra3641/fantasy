import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueItemsComponent } from './catalogue-items.component';

describe('CatalogueItemsComponent', () => {
  let component: CatalogueItemsComponent;
  let fixture: ComponentFixture<CatalogueItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
