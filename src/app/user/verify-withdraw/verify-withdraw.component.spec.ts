import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyWithdrawComponent } from './verify-withdraw.component';

describe('VerifyWithdrawComponent', () => {
  let component: VerifyWithdrawComponent;
  let fixture: ComponentFixture<VerifyWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
