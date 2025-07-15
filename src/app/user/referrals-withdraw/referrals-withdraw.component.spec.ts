import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsWithdrawComponent } from './referrals-withdraw.component';

describe('ReferralsWithdrawComponent', () => {
  let component: ReferralsWithdrawComponent;
  let fixture: ComponentFixture<ReferralsWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralsWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralsWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
