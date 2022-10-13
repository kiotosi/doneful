import MusicBase from '../components/MusicBase.vue';
import ProfileBase from '../components/ProfileBase.vue';

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { name: 'Home', component: MusicBase, path: '/' },
  { name: 'Profile', component: ProfileBase, path: '/profile' },
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

export default router;
