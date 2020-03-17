import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    //  check why `?` before params does not work when refreshing page
    path: '/details/lat=:lat&lon=:lon',
    name: 'details',
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Details.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
