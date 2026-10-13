import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WeatherService } from './weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [WeatherService],
  templateUrl: './app.html',   // ✅ match actual file name
  styleUrls: ['./app.css']     // ✅ match actual file name
})
export class AppComponent {
  city: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe({
        next: (data) => this.weatherData = data,
        error: (err) => console.error('Error fetching weather:', err)
      });
    }
  }
}
