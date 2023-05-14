import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongBannerEditComponent } from './long-banner-edit.component';

describe('LongBannerEditComponent', () => {
  let component: LongBannerEditComponent;
  let fixture: ComponentFixture<LongBannerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongBannerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongBannerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
