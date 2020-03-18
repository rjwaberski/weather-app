import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true,
})
export default class CurrentWeatherModule extends VuexModule {
  private test = 5;
}
