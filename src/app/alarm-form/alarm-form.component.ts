import { Component, ViewChild } from '@angular/core';
import { AlarmTypeSelectorComponent } from '../alarm-type-selector/alarm-type-selector.component';
import { GroupVehicleSelectionComponent } from '../group-vehicle-selection/group-vehicle-selection.component'
import { MatInputModule } from '@angular/material/input';
import { AlarmServerConnectionService } from '../alarm-server-connection.service';

@Component({
  selector: 'app-alarm-form',
  standalone: true,
  imports: [AlarmTypeSelectorComponent, GroupVehicleSelectionComponent, MatInputModule],
  templateUrl: './alarm-form.component.html',
  styleUrl: './alarm-form.component.css'
})
export class AlarmFormComponent {
  @ViewChild(AlarmTypeSelectorComponent)
  alarmTypeSelector!: AlarmTypeSelectorComponent;

  constructor(private apiConn: AlarmServerConnectionService) { }

  alarm() {
    const ao = {
      category: 'Brand',
      keyword: 'Huha',
      concreteKeyword: 'Aho',
      street: 'hier',
      houseNumber: '',
      vehiclesWithGroups: {"Gruppe 1": "HLF",
        "Gruppe 2": "LF8"
      },
      reportant: '',
      additionalInfo: ''
    };
    console.log("ALARM!");
    this.apiConn.postAlarm(ao);
  }
}

