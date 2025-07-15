import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositViewMoreComponent } from './deposit-view-more.component';

describe('DepositViewMoreComponent', () => {
  let component: DepositViewMoreComponent;
  let fixture: ComponentFixture<DepositViewMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositViewMoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
