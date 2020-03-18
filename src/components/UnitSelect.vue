<template>
  <div class="unit-select">UnitSelect</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class UnitSelect extends Vue {
  private options: string[] = ['Default', 'Metric', 'Imperial'];
}
</script>
