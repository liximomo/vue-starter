import Router from 'vue-router';

const moudleRegisted = {};

// 按需加载 vuex module
function registerModules(store, route) {
  const moduleLoaders = route.meta.modules.map(mod =>
    mod.loader().then(module => ({
      name: mod.name,
      module: module.default,
    })),
  );
  return Promise.all(moduleLoaders).then((mods) => {
    mods.forEach(({ name, module }) => {
      store.registerModule(name, module);
    });
    moudleRegisted[route.name] = true;
  });
}

export default function createRouter(routes, store) {
  const router = new Router(routes);
  router.beforeEach((to, from, next) => {
    const tasks = [];
    const routeNeedLoadModules = to.matched.filter(
      route => route.meta && route.meta.modules && !moudleRegisted[to.name],
    );
    if (routeNeedLoadModules.length) {
      tasks.push(Promise.all(routeNeedLoadModules.map(route => registerModules(store, route))));
    }

    Promise.all(tasks).then(next);
  });
  return router;
}
