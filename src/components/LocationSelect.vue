<template>
  <div class="location-select">
    <!-- <input class="location-select__input" type="text" v-model="query" /> -->
    <multiselect
      v-model="selected"
      id="ajax"
      label="formatted_address"
      track-by="formatted_address"
      placeholder="Type to search"
      open-direction="bottom"
      :options="options"
      :multiple="false"
      :searchable="true"
      :loading="loading"
      :internal-search="false"
      :clear-on-select="false"
      :close-on-select="true"
      :options-limit="300"
      :limit="3"
      :max-height="600"
      :show-no-results="false"
      :hide-selected="true"
      @search-change="fetchPlaces"
      @close="onBlur"
    />
    <button
      class="location-select__button"
      @click="checkWeather"
      :disabled="!this.selected"
    >
      check
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import LocationService from '@/services/locationService';
import Debounce from '@/utils/debounce';
import Multiselect from 'vue-multiselect';
import { ILocation } from '@/interfaces/locationData';

@Component({
  components: {
    Multiselect,
  },
})
export default class LocationSelect extends Vue {
  private selected: ILocation | null = null;
  private options: ILocation[] = [];
  private loading: boolean = false;

  @Debounce(500)
  private async fetchPlaces(query: string) {
    if (!query) {
      return;
    }
    const res = await LocationService.fetchLocation(query);

    if (res && res.length) {
      this.options = res;
    }
  }

  private onBlur() {
    if (!this.selected) {
      this.options = [];
    }
  }

  @Emit('fetch')
  private checkWeather() {
    if (!this.selected) {
      return;
    }
    return this.selected.geometry.location;
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.location-select {
  margin: 20px 0;
  width: 100%;
  display: flex;

  &__button {
    width: $buttonWidth;
    background: rgba(255, 255, 255, 0.5);
    color: white;
    padding: 10px 30px;
    border: 1px solid white;
    text-transform: uppercase;
    height: $buttonHeight;
  }

  &__input {
    width: calc(100% - #{$buttonWidth} - 22px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.2);
    height: $buttonHeight;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 10px 30px;
    color: white;
  }
}

@media only screen and (max-width: 600px) {
  .location-select {
    display: flex;
    flex-direction: column;

    &__input {
      width: 100%;
      margin-bottom: 20px;
    }

    &__button {
      width: 100%;
    }
  }
}
</style>
