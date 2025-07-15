import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDepositStatusComponent } from './change-deposit-status.component';

describe('ChangeDepositStatusComponent', () => {
  let component: ChangeDepositStatusComponent;
  let fixture: ComponentFixture<ChangeDepositStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeDepositStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDepositStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
