import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackImageUploadComponent } from './back-image-upload.component';

describe('BackImageUploadComponent', () => {
  let component: BackImageUploadComponent;
  let fixture: ComponentFixture<BackImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackImageUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
