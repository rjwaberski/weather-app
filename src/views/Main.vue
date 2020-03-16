<template>
  <div class="main">
    <h1>AirApp</h1>
    <p>
      Check the weather! Enter the city name, or
      <b>leave empty for geolocation</b>
    </p>

    <input type="text" v-model="query" />
    <button @click="fetchData">check</button>

    <weather-card />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getLocation } from '@/utils/geolocation';
import WeatherService from '@/services/weatherService';
import WeatherCard from '@/components/WeatherCard.vue';

@Component({
  components: {
    WeatherCard,
  },
})
export default class MainView extends Vue {
  private location: Coordinates | null = null;
  private geolocationLoading: boolean = false;
  private geolocationError: string = '';

  private weatherService = new WeatherService();

  private query: string = '';

  private async created() {
    await this.loadLocation();
    if (location) {
      this.weatherService.fetchWeather(this.location);
    }
  }

  private async loadLocation() {
    this.geolocationLoading = true;

    try {
      const res = await getLocation();
      this.location = res.coords;
    } catch (error) {
      console.error(error);
    } finally {
      this.geolocationLoading = false;
    }
  }

  private fetchData() {
    //  this.query -> coordinates // google geocoding
    //  fetch
  }
}
</script>

<style lang="scss" scoped></style>
