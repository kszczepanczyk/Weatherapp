import {  Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { WeatherService } from './weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _weatherService: WeatherService,private _elementRef: ElementRef, private _renderer: Renderer2){}
  isChanged:boolean = false;
  weatherData: any;
  imgUrl:string ="https://openweathermap.org/img/wn/";
  imgSrc:string = "";
  description:string = "";
  city:string = ''
  isDialogShown: boolean = false;
  errors: string ='';
  cityInput: string =''

  ngOnInit():void {
    this._weatherService.getWeatherData("Katowice").subscribe({
      next: (res) => {
        console.log(res);
        this.weatherData = res;
        this.imgSrc = this.imgUrl + res.weather[0].icon + "@2x.png";
        this.description = res.weather[0].main;
        this.city = res.name
      },
      error: (error) => this.errors = error.message
    })
  }
  changeForOlderPeople(){
    this.isChanged  = this.isChanged === false ? true : false;
    const smallFont = this._elementRef.nativeElement.querySelectorAll('.small-font');
    const bigFont = this._elementRef.nativeElement.querySelectorAll('.big-font');

    if(this.isChanged){
      smallFont.forEach((element: HTMLElement) => {
        this._renderer.setStyle(element,'font-size','25px');
      });
      bigFont.forEach((element: HTMLElement) => {
        this._renderer.setStyle(element,'font-size','40px');
      });
    }
    else {
      smallFont.forEach((element: HTMLElement) => {
        this._renderer.setStyle(element,'font-size','20px');
      });
      bigFont.forEach((element: HTMLElement) => {
        this._renderer.setStyle(element,'font-size','32px');
      });
    }
  }
  showDialog(){
    this.isDialogShown = true;
  }
  closeDialog(city:string){
    this._weatherService.getWeatherData(city).subscribe({
      next: (res) => {
        console.log(res);
        this.weatherData = res;
        this.imgSrc = this.imgUrl + res.weather[0].icon + "@2x.png";
        this.description = res.weather[0].main;
      },
      error: (error) => this.errors = error.message
    })
    this.isDialogShown = false;
  }
}
