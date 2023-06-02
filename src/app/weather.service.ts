import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  getWeatherData(cityName: string):Observable<any>{
    return this._http.get('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+api.key+'&units=metric')
  }
}
