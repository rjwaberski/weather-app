<template>
  <div class="main">
    <img v-if="weatherIcon" :src="weatherIcon" alt="icon" />
    <h1>AirApp</h1>
    <p>
      Check the weather! Enter the city name, or
      <b>leave empty for geolocation</b>
    </p>
    <location-select @fetch="fetchData" />
    <weather-card v-if="weatherData" :data="weatherData" :coords="coords" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getLocation } from '@/utils/geolocation';
import { IBaseWeather } from '@/interfaces/weatherData';
import { ICoords } from '@/interfaces/locationData';

import WeatherService from '@/services/weatherService';
import LocationService from '@/services/locationService';
import Endpoints from '@/utils/endpoints';
import WeatherCard from '@/components/WeatherCard.vue';
import LocationSelect from '@/components/LocationSelect.vue';

@Component({
  components: {
    WeatherCard,
    LocationSelect,
  },
})
export default class MainView extends Vue {
  private coords: ICoords | null = null;
  private weatherData: IBaseWeather | null = null;
  private geolocationLoading: boolean = false;

  private async created() {
    await this.loadLocation();
    if (this.coords) {
      this.fetchData(this.coords);
    }
  }

  private async loadLocation() {
    this.geolocationLoading = true;

    try {
      const res = await getLocation();
      this.coords = { lat: res.coords.latitude, lng: res.coords.longitude };
    } catch (error) {
      //  todo: handle error
    } finally {
      this.geolocationLoading = false;
    }
  }

  private async fetchData(coords: ICoords) {
    const data = await WeatherService.fetchWeather(coords);
    if (data) {
      this.weatherData = data;
    }
  }

  private get weatherIcon() {
    return this.weatherData
      ? Endpoints.weather.icon(this.weatherData.weather[0].icon)
      : null;
  }

  private async onSearch(query: string) {}
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .main {
    max-width: 300px;
  }
}
</style>
