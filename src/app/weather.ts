import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  private apiKey = 'YOUR_API_KEY'; // Replace with OpenWeatherMap API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
}
