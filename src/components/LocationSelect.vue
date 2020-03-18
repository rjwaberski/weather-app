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
    >
      <!-- <template slot="tag" slot-scope="{ option, remove }"
        ><span class="custom__tag"
          ><span>{{ option.name }}</span
          ><span class="custom__remove" @click="remove(option)">❌</span></span
        ></template
      >
      <template slot="clear" slot-scope="props">
        <div
          class="multiselect__clear"
          v-if="selectedCountries.length"
          @mousedown.prevent.stop="clearAll(props.search)"
        ></div> </template
      ><span slot="noResult"
        >Oops! No elements found. Consider changing the search query.</span
      > -->
    </multiselect>
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
$buttonWidth: 150px;
$height: 50px;
.location-select {
  margin: 20px 0;
  width: 100%;

  &__button {
    width: $buttonWidth;
    background: rgba(255, 255, 255, 0.5);
    color: white;
    padding: 10px 30px;
    border: none;
    text-transform: uppercase;
    height: $height;
  }

  &__input {
    width: calc(100% - #{$buttonWidth} - 22px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.2);
    height: $height;
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
