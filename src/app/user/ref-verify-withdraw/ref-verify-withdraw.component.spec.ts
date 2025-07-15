import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefVerifyWithdrawComponent } from './ref-verify-withdraw.component';

describe('RefVerifyWithdrawComponent', () => {
  let component: RefVerifyWithdrawComponent;
  let fixture: ComponentFixture<RefVerifyWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefVerifyWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefVerifyWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
