<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import 'assets/scss/main.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;

  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.2);
}
</style>
