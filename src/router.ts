import HomeView from './views/HomeView.vue';
import MusicView from './views/StatisticsView.vue';
import ProfileView from './views/ProfileView.vue';
import StatisticsView from './views/StatisticsView.vue';

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { name: 'Home', component: HomeView, path: '/' },
  { name: 'Music', component: MusicView, path: '/music' },
  { name: 'Stat', component: StatisticsView, path: '/stat' },
  { name: 'Profile', component: ProfileView, path: '/profile' },
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

export default router;
