import { Component } from '@angular/core';
import { AlarmServerConnectionService } from '../alarm-server-connection.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-group-vehicle-selection',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './group-vehicle-selection.component.html',
  styleUrl: './group-vehicle-selection.component.css'
})
export class GroupVehicleSelectionComponent {
  vehicles: String[] = [];
  groups: String[] = [];

  constructor(private apiConn: AlarmServerConnectionService) { }

  ngOnInit(): void {
    this.fetchVehicles();
    this.fetchGroups();
  }

  

  fetchVehicles() {
    this.apiConn.getVehicles().subscribe(
      (response) => {
        this.vehicles = response;
      },
      (error) => {
        console.error(error);
      })
  }
  fetchGroups() {
    this.apiConn.getGroups().subscribe(
      (response) => {
        this.groups = response;
      },
      (error) => {
        console.error(error);
      })
  }
}
