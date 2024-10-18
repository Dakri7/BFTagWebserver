import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { AlarmServerConnectionService } from '../alarm-server-connection.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-alarm-type-selector',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, MatRadioModule, FormsModule],
  templateUrl: './alarm-type-selector.component.html',
  styleUrl: './alarm-type-selector.component.css'
})
export class AlarmTypeSelectorComponent implements OnInit{

  shrotKeywordRegex = /[A-Za-z]\s?\d\.\d{1,2}\s?/g;

  aao: String[] = [];
  category: string = "";
  keyword: string = "";
  concreteKeyword: string =  "";
  filteredOptions!: Observable<string[]>;

  constructor(private apiConn: AlarmServerConnectionService) { }

  ngOnInit(): void {
    //this.fetchAAO(this.category);
    
  }

  categoryChange(event: MatRadioChange) {
    this.fetchAAO(this.category);
  }

  fetchAAO(cat: string| undefined){
    if(cat === undefined){
      this.aao = [];
    } else {
      this.apiConn.getAAO(cat).subscribe({
        next: (response) => {console.log(response); this.aao = response},
        error: (error) => alert(error.message)
      })
    }
    }
    
}
