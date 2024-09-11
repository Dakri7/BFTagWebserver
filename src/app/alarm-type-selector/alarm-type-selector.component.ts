import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { AlarmServerConnectionService } from '../alarm-server-connection.service';

@Component({
  selector: 'app-alarm-type-selector',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, MatRadioModule, FormsModule],
  templateUrl: './alarm-type-selector.component.html',
  styleUrl: './alarm-type-selector.component.css'
})
export class AlarmTypeSelectorComponent {

  shrotKeywordRegex = /[A-Za-z]\s?\d\.\d{1,2}\s?/g;

  streetNames: String[] = [];
  aao: String[] = [];
  category: string | undefined;
  keyword: string = "";
  concreteKeyword: string =  "";

  constructor(private apiConn: AlarmServerConnectionService) { }

  ngOnInit(): void {
    this.fetchStreetNames();
    this.fetchAAO(this.category);
  }

  categoryChange(event: MatRadioChange) {
    console.log("Radio changed to" + event.value)
    this.fetchAAO(this.category);
  }

  fetchStreetNames() {
    this.apiConn.getStreetNames().subscribe(
      (response) => {
        this.streetNames = response;
      },
      (error) => {
        console.error(error);
      })
  }

  fetchAAO(cat: string| undefined){
    if(cat === undefined){
      this.aao = [];
    } else {
      this.apiConn.getAAO(cat).subscribe(
        (response) => {
          this.aao = response;
        },
        (error) => {
          console.error(error);
        })
    }
    }
    
}
