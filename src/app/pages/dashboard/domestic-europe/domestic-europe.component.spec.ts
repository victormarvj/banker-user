import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticEuropeComponent } from './domestic-europe.component';

describe('DomesticEuropeComponent', () => {
  let component: DomesticEuropeComponent;
  let fixture: ComponentFixture<DomesticEuropeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomesticEuropeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomesticEuropeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
