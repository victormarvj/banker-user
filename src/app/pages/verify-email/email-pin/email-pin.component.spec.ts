import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPinComponent } from './email-pin.component';

describe('EmailPinComponent', () => {
  let component: EmailPinComponent;
  let fixture: ComponentFixture<EmailPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailPinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
