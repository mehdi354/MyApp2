import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  constructor(private http: HttpClient ) { }

  getApiData(){
    return console.log("Asdasdasda")
  }
}
