# vue-starter

> A Vue.js project

## 结构说明

| 目录／文件| 说明|
|:-------:|:---|
| lib             | 有潜力跨项目应用的库(按照库的方式编写，依赖需自我提供, 做到开箱即用) |
| utils           | 存放通用工具函数(无关上下文的纯函数) |
| components      | app 组件 |
| layouts         | 页面布局 |
| pages           | app 的所有页面 |
| modules         | vuex 模块 |
| style           | scss样式 |
| routes          | 路由定义 |
| path.js         | 所有页面的 url 定义 |
| store.js        | vuex stored定义 |
| App.vue         | app 根组件 |
| main.js         | 入口文件 |

## 约定

### css
* 禁止使用 `scope` 属性, 除全局类名外，所有 css 命名严格遵循 BEM范式。

### VUEX

#### COMMON
1. 禁止使用命名空间模块。所有 `action`, `getter` 的命名需自带命名空间。
1. 所有的 `action` 常量名定义必须加上 `module` 名前缀，避免命名冲突。 如：`modules/user.js` 中的 `action` 必须加 `USER_` 前缀, `USER_SET_USERNAME`, `USER_LOGOUT`, `USER_IN`。
1. 所有的 `action` 都必须用 `src/lib/vuex-flux-action/createAction` 方式产出。
1. 所有的 `action` 都必须以 `store.dispatchFluxAction($action)` 的形式递交。
1. 所有的 `getter` 名必须加上模块前缀，参考 modules/user.js。

#### API

1. api 请求必须定义为一个常量, 冠以 `REQUEST_` 前缀。
1. api 请求必须通过 `src/lib/vuex-flux-action/createApiAction` 产出一个 `apiACtion`。
1. 请求会产生3个 vuex 的 mutation 操作：`${apiName}_PENDING`, `${apiName}_DONE`, `${apiName}_FAIL`, 分别代表等待请求结果中，请求完成，请求失败，
  
  example:
  ```js
    const REQUEST_USERINFO = 'REQUEST_USERINFO';
    const getUserInfo = createAction(REQUEST_USERINFO, uid => fetch(`api/userinfo?uid=${uid}`));
    store.dispatchApi(getUserInfo(11250)); // 获取 uid 为 11250 的用户信息
    // 在 vuex 中定义 mutation 处理 api 结果。
    {
      mutations：{
        [`${REQUEST_USERINFO}_PENDING`]: state => {
          state.fetching = true;
          // do something
        },
        [`${REQUEST_USERINFO}_DONE`]: (state, respData) => {
          state.fetching = false;
          state.user = respData;
          // do something
        },
        [`${REQUEST_USERINFO}_FAIL`]: state => {
          state.fetching = false;
          // do something
        }
      }
    }
  ```

### vuex

* 一个模块中的 `getter`, `mutation`, `state` 全部定义在一个单文件中，模块名作为文件名放到 `src/modules/` 目录中。

### router

* 所有 `router-link` 都要以 `inject: ['path']` 方式引用页面。 参考 `src/App.vue`;

## 构建

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
