import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  getWeatherData(cityName: string):Observable<any>{
    return this._http.get('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=74e65510a725402310849d34d936a79b&units=metric')
  }
}
