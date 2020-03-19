<template>
  <div class="logo-wrapper" :class="{ center }">
    <transition name="slide-fade">
      <img v-if="iconSrc" :src="iconSrc" alt="icon" />
    </transition>
    <h1>AirApp</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const weather = namespace('weather');

@Component
export default class AppLogo extends Vue {
  @Prop({ required: false, default: false }) private center!: boolean;
  @weather.Getter private iconSrc!: string;
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;

  &.center {
    justify-content: center;
  }
}
</style>
