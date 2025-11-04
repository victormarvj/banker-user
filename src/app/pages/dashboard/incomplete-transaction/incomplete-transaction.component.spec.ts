import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteTransactionComponent } from './incomplete-transaction.component';

describe('IncompleteTransactionComponent', () => {
  let component: IncompleteTransactionComponent;
  let fixture: ComponentFixture<IncompleteTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncompleteTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
