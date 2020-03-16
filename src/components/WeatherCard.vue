<template>
  <div class="weather-card">
    <div class="weather-card__content">
      <div>
        {{ temp }}
      </div>
      <div>
        <p>Date: {{ date }}</p>
        <p>Location: {{ location }}</p>
        <p>Description: {{ description }}</p>
      </div>
    </div>
    <div class="weather-card__actions">
      <button @click="goToDetails">MORE</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class WeatherCard extends Vue {
  private temp: string = `29*C`;
  private date: string = '22.08.2019';
  private location: string = 'Poznań, PL';
  private description: string = 'sunny';

  private goToDetails() {
    this.$router.push({ name: 'details' });
  }
}
</script>

<style lang="scss" scoped></style>
