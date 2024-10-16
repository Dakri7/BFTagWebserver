import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmServerConnectionService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost/api/";

  getGroups() {
    return this.http.get<String[]>(this.apiUrl + "groups");
  }

  getVehicles(): Observable<String[]> {
    return this.http.get<String[]>(this.apiUrl + "vehicles");
  }

  getStreetNames() {
    return this.http.get<string[]>(this.apiUrl + "street-names");
  }

  getAAO(category: string) {
    let params = new HttpParams().set("category", category)
    return this.http.get<String[]>(this.apiUrl + "aao", {params: params});
  }

  postAlarm(ao: AlarmObject){
    return this.http.post(this.apiUrl + "alarm", ao);
  }
}

interface AlarmObject {
  category: string;
  keyword: string;
  concreteKeyword: string;
  street: string;
  houseNumber: string;
  vehiclesWithGroups: { [key: string]: string };
  reportant: string;
  additionalInfo: string;
}
