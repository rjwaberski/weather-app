import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import CurrentWeather from '@/views/CurrentWeather.vue';

export enum RouteName {
  CurrentWeather = 'currentWeather',
  ForecastWeather = 'forecastWeather',
}

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: RouteName.CurrentWeather,
    component: CurrentWeather,
  },
  {
    //  check why `?` before params does not work when refreshing page
    path: '/forecast/lat=:lat&lng=:lng',
    name: RouteName.ForecastWeather,
    props: true,
    beforeEnter: (to: Route, from: Route, next: () => void) => {
      //  todo: validate to.params
      next();
    },
    component: () =>
      import(/* webpackChunkName: "forecast" */ '@/views/ForecastWeather.vue'),
  },
  {
    path: '*',
    redirect: { name: RouteName.CurrentWeather },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
