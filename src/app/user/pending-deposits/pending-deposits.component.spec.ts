import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDepositsComponent } from './pending-deposits.component';

describe('PendingDepositsComponent', () => {
  let component: PendingDepositsComponent;
  let fixture: ComponentFixture<PendingDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingDepositsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
