import { Component, QueryList, ViewChildren } from '@angular/core';
import { AlarmServerConnectionService } from '../alarm-server-connection.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelect, MatSelectModule} from '@angular/material/select';


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

  @ViewChildren('vehicleRef')
  vehicleSelectRefs!: QueryList<MatSelect>;

  constructor(private apiConn: AlarmServerConnectionService) { }

  ngOnInit(): void {
    this.fetchVehicles();
    this.fetchGroups();
  }

  getVehiclesForGroups(){
    const back: Map<String, String> = new Map();
    console.log(this.vehicleSelectRefs)
    this.vehicleSelectRefs.forEach((select, idx) => {
      console.log("Hier");
      if(select.value !== undefined){
        back.set(this.vehicles[idx], select.value);
      }
    })
    console.log(back);
    return back;
  }

  fetchVehicles() {
    this.apiConn.getVehicles().subscribe({
      next: (response) => this.vehicles = response,
      error: (error) => alert(error.message)
    })
        
  }
  fetchGroups() {
    this.apiConn.getGroups().subscribe({
      next: (response) => this.groups = response,
      error: (error) => alert(error.message)
    })
  }
}
