import Loadable from '@/components/Loadable';

const routes = {
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Loadable(() => import(/* webpackChunkName: "home" */ '../pages/home')),
    },
    {
      path: '/about',
      name: 'about',
      component: Loadable(() => import(/* webpackChunkName: "about" */ '../pages/about')),
    },
  ],
};
export default routes;
