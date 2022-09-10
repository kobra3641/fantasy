import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueWindowComponent } from './catalogue-window.component';

describe('CatalogueWindowComponent', () => {
  let component: CatalogueWindowComponent;
  let fixture: ComponentFixture<CatalogueWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
