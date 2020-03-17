<template>
  <div class="location-select">
    <input class="location-select__input" type="text" v-model="query" />
    <button class="location-select__button" @click="onSearch">check</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
@Component
export default class LocationSelect extends Vue {
  private query: string = '';

  @Emit('search')
  private onSearch() {
    return this.query;
  }
}
</script>

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
