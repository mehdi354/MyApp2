import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FootballDetailsService {

  ROOT_URL = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';

  constructor(private http: HttpClient ) { }

  public footballReports(){
    
    return this.http.get(this.ROOT_URL)
  }

}
