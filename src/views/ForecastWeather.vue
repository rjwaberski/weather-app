<template>
  <div class="class">DetailsView</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import WeatherService from '@/services/weatherService';
@Component
export default class ForecastWeather extends Vue {
  @Prop({ required: true }) private lat!: string;
  @Prop({ required: true }) private lon!: string;

  private async created() {
    const data = await WeatherService.fetchHourlyForecast({
      lat: this.lat,
      lon: this.lon,
    });
  }
}
</script>

<style lang="scss" scoped></style>
