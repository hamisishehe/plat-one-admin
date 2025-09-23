import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRefWithdrawComponent } from './pending-ref-withdraw.component';

describe('PendingRefWithdrawComponent', () => {
  let component: PendingRefWithdrawComponent;
  let fixture: ComponentFixture<PendingRefWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingRefWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRefWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
