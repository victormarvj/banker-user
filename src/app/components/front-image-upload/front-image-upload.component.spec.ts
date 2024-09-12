import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontImageUploadComponent } from './front-image-upload.component';

describe('FrontImageUploadComponent', () => {
  let component: FrontImageUploadComponent;
  let fixture: ComponentFixture<FrontImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontImageUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
