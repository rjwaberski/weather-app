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
import { formatTemperature, formatHour } from '@/utils/displayValuesFormatting';
@Component
export default class ForecastDataRow extends Vue {
  @Prop({ required: true }) private data!: IBaseForecast;

  private get formattedHour(): string {
    return formatHour(this.data.dt * 1000);
  }

  private get formattedTemp(): string {
    return formatTemperature(this.data.main.temp);
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
.forecast-data-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: $gap;
  margin-bottom: $gap;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 10px;
    background: $transparentLight;
  }
}
</style>
