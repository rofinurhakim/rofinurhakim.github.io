import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  city: any;
  weatherData: any;
  latitude: number;
  longitude: number;
  isFetching: boolean;

  constructor(private api: ApiService) {
    this.isFetching = true;
  }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    this.getCoordinates();
  }

  getLocationData(): void {
    this.api.get(`weather?lat=${this.latitude}&lon=${this.longitude}`).subscribe(res => {
      console.log('data city', res);
      res.date_formatted = moment().utcOffset(res.timezone, true).format('llll');
      this.city = res
    });
  }

  getWeatherData(): void {
    this.isFetching = true;
    this.getLocationData();

    this.api
      .get(`onecall?lat=${this.latitude}&lon=${this.longitude}&units=metric`)
      .subscribe(res => {
        console.log('data weather', res);
        res.daily.forEach((el, i) => {
          el.date_formatted = moment().add(i, 'days').utcOffset(res.timezone_offset, true).format('ll');
          el.sunrise_formatted = moment(el.sunrise).format('h:mm a');
          el.sunset_formatted = moment(el.sunset).format('h:mm a');
        });
        this.weatherData = res;
        this.isFetching = false;
      });
  }

  getSearchLocation(): void {
    this.api.get(`find?${this.city}&units=metric`).subscribe(res => {
      console.log('data response', res);
    });
  }

  getCoordinates(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((val) => {
        this.latitude = val.coords.latitude;
        this.longitude = val.coords.longitude;
        this.getLocationData();
        this.getWeatherData();
      });
    } else {
    }
  }
}
