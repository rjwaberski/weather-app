<template>
  <div class="weather-card">
    <div class="weather-card__content">
      <div class="weather-card__content--temperature">
        {{ temp }}
      </div>
      <div class="weather-card__content--additional">
        <p>Date: {{ formattedDate }}</p>
        <p>Location: {{ data.name }}</p>
        <p>Description: {{ defaultDesc }}</p>
      </div>
      <div class="weather-card__content--button-wrapper">
        <button @click="goToDetails">More</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IBaseWeather } from '@/interfaces/weatherData';

@Component
export default class WeatherCard extends Vue {
  @Prop({ required: true }) private data!: IBaseWeather;
  @Prop({ required: true }) private coords!: Coordinates;

  private temp: string = `29*C`;
  private date: Date = new Date();
  private location: string = 'Poznań, PL';
  private description: string = 'sunny';

  private goToDetails() {
    this.$router.push({
      name: 'details',
      params: {
        lat: `${this.coords.latitude}`,
        lon: `${this.coords.longitude}`,
      },
    });
  }

  private get formattedDate(): string {
    return this.date.toLocaleDateString('pl-PL');
  }

  private get defaultDesc(): string {
    const [defaultData] = this.data.weather;
    return defaultData ? defaultData.description : '-';
  }
}
</script>

<style lang="scss" scoped>
.weather-card {
  background: rgba(255, 255, 255, 0.2);
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
