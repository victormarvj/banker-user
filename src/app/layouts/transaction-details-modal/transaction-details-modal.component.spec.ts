import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsModalComponent } from './transaction-details-modal.component';

describe('TransactionDetailsModalComponent', () => {
  let component: TransactionDetailsModalComponent;
  let fixture: ComponentFixture<TransactionDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
