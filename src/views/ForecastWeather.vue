<template>
  <div class="forecast-weather" v-if="forecastWeatherData.length">
    <app-logo />

    <div class="forecast-weather__main">
      <weather-card :extended="false" />
    </div>
    <div class="forecast-weather__details">
      <div class="forecast-weather__details__headers">
        <div>Hour</div>
        <div>Temperature</div>
        <div>Description</div>
      </div>
      <forecast-data-row
        v-for="(val, index) in forecastWeatherData"
        :key="index"
        :data="val"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import { IBaseForecast, IWeatherCardData } from '@/interfaces/weatherData';

import UiMixin from '@/mixins/ui';

import WeatherCard from '@/components/WeatherCard.vue';
import ForecastDataRow from '@/components/ForecastDataRow.vue';
import AppLogo from '@/components/AppLogo.vue';

import WeatherService from '@/services/weatherService';

@Component({
  components: {
    WeatherCard,
    ForecastDataRow,
    AppLogo,
  },
})
export default class ForecastWeather extends Mixins(UiMixin) {
  //  todo: find a clean way to parse route params to numbers
  @Prop({ required: true }) private lat!: string;
  @Prop({ required: true }) private lng!: string;

  private forecastWeatherData: IBaseForecast[] = [];

  private get weatherCardData(): IWeatherCardData | null {
    if (!this.forecastWeatherData.length) {
      return null;
    }

    return {
      temp: 28,
      location: 'tes',
      description: 'test2',
    };
  }

  private async created() {
    const res = await WeatherService.fetchHourlyForecast({
      lat: parseFloat(this.lat),
      lng: parseFloat(this.lng),
    });

    if (!res.status) {
      this.showErrorSnack(res);
      return;
    }

    if (res.status === 200) {
      this.forecastWeatherData = res.data.list;
    } else {
      //  todo: handle openweatherapi error
    }
  }
}
</script>

<style lang="scss" scoped>
$columnWidth: 100% / 3;
.forecast-weather__details__headers {
  display: grid;
  grid-template-columns: $columnWidth $columnWidth $columnWidth;
  grid-gap: 10px;
  margin: 40px 0 10px;
  font-weight: bold;
}
</style>
