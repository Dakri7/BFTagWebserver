import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTypeSelectorComponent } from './alarm-type-selector.component';

describe('AlarmTypeSelectorComponent', () => {
  let component: AlarmTypeSelectorComponent;
  let fixture: ComponentFixture<AlarmTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmTypeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
