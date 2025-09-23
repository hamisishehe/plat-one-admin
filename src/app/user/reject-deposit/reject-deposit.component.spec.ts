import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectDepositComponent } from './reject-deposit.component';

describe('RejectDepositComponent', () => {
  let component: RejectDepositComponent;
  let fixture: ComponentFixture<RejectDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
