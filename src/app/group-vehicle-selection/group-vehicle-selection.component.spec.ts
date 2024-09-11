import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupVehicleSelectionComponent } from './group-vehicle-selection.component';

describe('GroupVehicleSelectionComponent', () => {
  let component: GroupVehicleSelectionComponent;
  let fixture: ComponentFixture<GroupVehicleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupVehicleSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupVehicleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
