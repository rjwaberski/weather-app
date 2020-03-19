<template>
  <div class="forecast-data-row">
    <div class="forecast-data-row__hour">
      {{ formattedHour }}
    </div>
    <div class="forecast-data-row__temp">
      {{ formattedTemp }}
    </div>
    <div class="forecast-data-row__desc">
      {{ desc }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IBaseForecast } from '@/interfaces/weatherData';
@Component
export default class name extends Vue {
  @Prop({ required: true }) private data!: IBaseForecast;

  private get formattedHour() {
    return new Date(this.data.dt * 1000).toLocaleTimeString('pl-PL');
  }

  private get formattedTemp(): string {
    return `${Math.round(this.data.main.temp)}°C`;
  }

  private get desc(): string {
    const [weather] = this.data.weather;
    return weather ? weather.description : '-';
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

$gap: 10px;
$columnWidth: 100% / 3;
.forecast-data-row {
  display: grid;
  grid-template-columns: repeat(3, $columnWidth);
  grid-gap: 10px;

  div {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 10px;
    background: $transparentLight;
  }
}
</style>
