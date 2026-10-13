import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  favorites: string[] = [];
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {
    const saved = localStorage.getItem('favorites');
    if (saved) this.favorites = JSON.parse(saved);
  }

  getBackgroundClass(): string {
  if (!this.weatherData) return '';
  const condition = this.weatherData.weather[0].main.toLowerCase();
  if (condition.includes('rain')) return 'rainy-bg';
  if (condition.includes('cloud')) return 'cloudy-bg';
  return 'sunny-bg';
}

  getWeather() {
    if (!this.city) return;
    this.loading = true;
    this.error = '';
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'City not found!';
        this.loading = false;
      }
    });
  }

  useLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.weatherService.getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
        .subscribe(data => this.weatherData = data);
    });
  }

  addFavorite() {
    if (this.city && !this.favorites.includes(this.city)) {
      this.favorites.push(this.city);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  loadFavorite(city: string) {
    this.city = city;
    this.getWeather();
  }
}
