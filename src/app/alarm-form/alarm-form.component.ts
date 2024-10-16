import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlarmTypeSelectorComponent } from '../alarm-type-selector/alarm-type-selector.component';
import {AsyncPipe} from '@angular/common';
import { GroupVehicleSelectionComponent } from '../group-vehicle-selection/group-vehicle-selection.component'
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { AlarmServerConnectionService } from '../alarm-server-connection.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-alarm-form',
  standalone: true,
  imports: [AlarmTypeSelectorComponent, GroupVehicleSelectionComponent, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, FormsModule],
  templateUrl: './alarm-form.component.html',
  styleUrl: './alarm-form.component.css'
})
export class AlarmFormComponent implements OnInit{
  @ViewChild(AlarmTypeSelectorComponent)
  alarmTypeSelector!: AlarmTypeSelectorComponent;
  @ViewChild(GroupVehicleSelectionComponent)
  groupVehicleSelector!: GroupVehicleSelectionComponent;
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  streetNames: string[] = [];
  streetName: string = "";
  houseNumber: string = "";
  reportant: string = "";
  additionalInfo: string = "";

  constructor(private apiConn: AlarmServerConnectionService) { }

  ngOnInit(): void {
    this.fetchStreetNames();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value || '')),
    );
  }

  private filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.streetNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  fetchStreetNames() {
    this.apiConn.getStreetNames().subscribe({
      next: (response) => this.streetNames = response,
      error: (error) => alert(error.message)
    })
  }

  alarm() {
    const ao = {
      category: this.alarmTypeSelector.category,
      keyword: this.alarmTypeSelector.keyword,
      concreteKeyword: this.alarmTypeSelector.concreteKeyword,
      street: this.streetName,
      houseNumber: this.houseNumber,
      vehiclesWithGroups: Object.fromEntries(this.groupVehicleSelector.getVehiclesForGroups()),
      reportant: this.reportant,
      additionalInfo: this.additionalInfo
    };
    if(window.confirm(this.alarmTypeSelector.keyword + " alarmieren?")){
      console.log("ALARM!");
      this.apiConn.postAlarm(ao).subscribe({
        next: () => alert("Alarmierung erfolgreich"),
        error: () => alert("Alarmirung fehlgeschlagen")
      });
    }
  }
}

