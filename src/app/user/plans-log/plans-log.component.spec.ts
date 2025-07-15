import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansLogComponent } from './plans-log.component';

describe('PlansLogComponent', () => {
  let component: PlansLogComponent;
  let fixture: ComponentFixture<PlansLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlansLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
