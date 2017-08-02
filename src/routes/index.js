import Loadable from '@/components/Loadable';

export default {
  routes: [
    {
      name: 'home',
      path: '/',
      component: Loadable(() => import(/* webpackChunkName: "home" */ '../pages/Home')),
    },
    {
      name: 'about',
      path: '/about',
      component: Loadable(() => import(/* webpackChunkName: "about" */ '../pages/About')),
    },
  ],
};
