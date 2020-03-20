<template>
  <div class="weather-card" :class="{ condensed: !extended }">
    <transition name="slide-fade" mode="out-in">
      <preloader v-if="loading" />
    </transition>
    <div class="weather-card__content" :class="loading">
      <div class="weather-card__content--temperature" v-if="extended">
        {{ formattedTemp }}
      </div>
      <div class="weather-card__content--additional">
        <p><b>Date:</b> {{ formattedDate }}</p>
        <p><b>Location:</b> {{ location }}</p>
        <p v-if="extended"><b>Description:</b> {{ description }}</p>
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
import { namespace } from 'vuex-class';
import { formatDate, formatTemperature } from '@/utils/displayValuesFormatting';

import Preloader from '@/components/Preloader.vue';

const weather = namespace('weather');

@Component({
  components: {
    Preloader,
  },
})
export default class WeatherCard extends Vue {
  @Prop({ required: false }) private coords!: ICoords;
  @Prop({ required: false, default: true }) private extended!: boolean;
  @Prop({ required: false, default: false }) private loading!: boolean;

  @weather.Getter private isDataComplete!: boolean;
  @weather.Getter private location!: string;
  @weather.Getter private temp!: number;
  @weather.Getter private description!: string;

  private date: Date = new Date();

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
    return formatDate(this.date);
  }

  private get formattedTemp(): string {
    return formatTemperature(this.temp);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.weather-card {
  background: $transparentLight;
  color: white;
  position: relative;

  &__content {
    display: flex;
    padding: 20px;

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

  &.condensed {
    .weather-card__content--additional {
      display: flex;
      flex-direction: row;

      p {
        flex-grow: 1;
        text-align: center;
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
