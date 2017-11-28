function genPendingType(type) {
  return `${type}_PENDING`;
}

function genSuccessType(type) {
  return `${type}_DONE`;
}

function genFailType(type) {
  return `${type}_FAIL`;
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function isFunction(val) {
  return typeof val === 'function';
}

function createFluxActionDispatch(dispatch, actionName) {
  return action => dispatch(actionName, action, { root: true });
}

export function ServerException(code, message, data) {
  this.code = code;
  this.message = message;
  this.data = data;
  this.name = 'ServerException';
}

export function createfluxAction(actionName) {
  return (contenxt, action) => {
    if (action.error) {
      throw action.payload;
    }

    const { dispatch, commit } = contenxt;
    const { type, payload, meta } = action;
    const dispatchFluxAction = createFluxActionDispatch(dispatch, actionName);
    const safeCommit = (mutaion, ...args) => {
      try {
        commit(mutaion, ...args);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('vuex error during commit mutation:', error);
      }
    };

    // 处理 api
    if (meta && meta.API) {
      if (!isPromise(payload)) {
        throw new Error('dispatch API request payload to be a promise!');
      }

      safeCommit(genPendingType(type));

      let serverSesponse;
      return payload
        .then((response) => {
          serverSesponse = response;
          return response.json();
        })
        .then((json) => {
          if (!serverSesponse.ok) {
            throw new ServerException(json.code, json.message || '发生错误！', json.data);
          }

          safeCommit(genSuccessType(type), {
            ...action,
            payload: json,
          });
          return json;
        })
        .catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error(error);
          }

          let err;
          if (error instanceof ServerException) {
            err = error;
          } else {
            err = new Error('网络出错！');
          }

          safeCommit(genFailType(type), {
            ...action,
            payload: err,
            error: true,
          });
          throw err;
        });
    }

    // 处理 promise
    if (isPromise(payload)) {
      return payload.then(
        (result) => {
          commit({
            ...action,
            payload: result,
          });
          return result;
        },
        (error) => {
          commit({
            ...action,
            payload: error,
            error: true,
          });
          throw error;
        },
      );
    }

    if (isFunction(action)) {
      return action({ dispatchFluxAction, ...contenxt });
    }

    return commit(action);
  };
}

export function createPlugin(actionName) {
  return (store) => {
    const dispatch = store.dispatch.bind(store);
    store.dispatchFluxAction = createFluxActionDispatch(dispatch, actionName);
  };
}

export default function fluxAction({ actionName = 'FLUX_ACTION' } = {}) {
  return {
    action: createfluxAction(actionName),
    plugin: createPlugin(actionName),
  };
}
