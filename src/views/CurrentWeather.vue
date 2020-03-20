<template>
  <div class="current-weather">
    <div class="current-weather__search">
      <app-logo :center="true" />
      <p>
        Check the weather! Enter the city name, or
        <b>leave empty for geolocation</b>
      </p>
      <location-select @fetch="fetchData" />
    </div>

    <transition name="slide-fade" mode="out-in">
      <weather-card
        v-if="weatherData"
        :coords="coords"
        :loading="geolocationLoading || weatherLoading"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import { getLocation } from '@/utils/geolocation';
import { IBaseWeather, IWeatherCardData } from '@/interfaces/weatherData';
import { ICoords } from '@/interfaces/locationData';
import { namespace } from 'vuex-class';
import { AxiosResponse } from 'axios';

import UiMixin from '@/mixins/ui';

import WeatherService from '@/services/weatherService';
import LocationService from '@/services/locationService';
import WeatherCard from '@/components/WeatherCard.vue';
import LocationSelect from '@/components/LocationSelect.vue';
import AppLogo from '@/components/AppLogo.vue';

const weather = namespace('weather');

@Component({
  components: {
    WeatherCard,
    LocationSelect,
    AppLogo,
  },
})
export default class CurrentWeather extends Mixins(UiMixin) {
  private coords: ICoords | null = null;
  private weatherData: IBaseWeather | null = null;

  private geolocationLoading: boolean = false;
  private weatherLoading: boolean = false;

  @weather.Action private fetchWeather!: (coords: ICoords) => AxiosResponse;
  @weather.Getter private iconSrc!: string;

  private mounted() {
    this.loadLocation();
  }

  private async loadLocation() {
    this.geolocationLoading = true;
    try {
      const res = await getLocation();
      if (this.weatherData) {
        return;
      }
      this.coords = { lat: res.coords.latitude, lng: res.coords.longitude };
      await this.fetchData(this.coords);
    } catch (error) {
      this.showErrorSnack(error.message);
    } finally {
      this.geolocationLoading = false;
    }
  }

  private async fetchData(coords: ICoords) {
    this.weatherLoading = true;
    this.coords = coords;
    const res = await this.fetchWeather(coords);

    if (!res.status) {
      this.showErrorSnack('Geolocation error');
    }

    if (res.status === 200) {
      this.weatherData = res.data;
    }

    if (!this.coords) {
      this.geolocationLoading = false;
    }
    this.weatherLoading = false;
  }

  private get weatherCardData(): IWeatherCardData | null {
    if (!this.weatherData) {
      return null;
    }

    const { temp } = this.weatherData.main;
    const { name: location } = this.weatherData;
    const { description } = this.weatherData.weather[0];

    return {
      temp,
      location,
      description,
    };
  }
}
</script>
