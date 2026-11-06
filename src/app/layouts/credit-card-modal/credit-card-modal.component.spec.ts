import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardModalComponent } from './credit-card-modal.component';

describe('CreditCardModalComponent', () => {
  let component: CreditCardModalComponent;
  let fixture: ComponentFixture<CreditCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
