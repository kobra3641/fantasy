import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueEditComponent } from './catalogue-edit.component';

describe('CatalogueEditComponent', () => {
  let component: CatalogueEditComponent;
  let fixture: ComponentFixture<CatalogueEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
