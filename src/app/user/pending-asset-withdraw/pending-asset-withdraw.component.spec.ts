import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAssetWithdrawComponent } from './pending-asset-withdraw.component';

describe('PendingAssetWithdrawComponent', () => {
  let component: PendingAssetWithdrawComponent;
  let fixture: ComponentFixture<PendingAssetWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingAssetWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingAssetWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
