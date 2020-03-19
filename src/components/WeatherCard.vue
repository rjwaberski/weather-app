<template>
  <div class="weather-card" :class="{ extended }">
    <div class="weather-card__content">
      <div class="weather-card__content--temperature">
        {{ formattedTemp }}
      </div>
      <div class="weather-card__content--additional">
        <p><b>Date:</b> {{ formattedDate }}</p>
        <p><b>Location:</b> {{ data.location }}</p>
        <p><b>Description:</b> {{ data.description }}</p>
      </div>
      <div v-if="coords" class="weather-card__content--button-wrapper">
        <button @click="goToDetails">More</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IWeatherCardData } from '@/interfaces/weatherData';
import { ICoords } from '@/interfaces/locationData';
import { RouteName } from '@/router';

@Component
export default class WeatherCard extends Vue {
  @Prop({ required: true }) private data!: IWeatherCardData;
  @Prop({ required: false }) private coords!: ICoords;
  @Prop({ required: false, default: true }) private extended!: boolean;

  private temp: number = 0;
  private date: Date = new Date();
  private location: string = '';
  private description: string = '';

  private goToDetails() {
    this.$router.push({
      name: RouteName.ForecastWeather,
      params: {
        lat: `${this.coords.lat}`,
        lng: `${this.coords.lng}`,
      },
    });
  }

  private get formattedDate(): string {
    return this.date.toLocaleDateString('pl-PL');
  }

  private get formattedTemp(): string {
    return `${Math.round(this.data.temp)}°C`;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.weather-card {
  background: $transparentLight;
  color: white;
  padding: 20px;

  &__content {
    display: flex;

    &--temperature {
      flex-grow: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      font-weight: bold;
    }

    &--additional {
      flex-grow: 3;
      text-align: left;
    }

    &--button-wrapper {
      flex-grow: 1;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      button {
        background: none;
        border: none;
        color: white;
        font-weight: bold;
        text-transform: uppercase;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .weather-card__content {
    flex-direction: column;
  }
}
</style>
