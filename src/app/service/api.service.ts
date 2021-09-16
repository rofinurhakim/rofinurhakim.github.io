import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://openweathermap.org/data/2.5/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(url): Observable<any> {
    return this.http
      .get(API_URL + url + '&appid=439d4b804bc8187953eb36d2a8c26a02')
      .pipe(map(res => res));
  }
}
