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

function ServerException(message) {
  this.message = message;
  this.name = 'ServerException';
}

function createFluxActionDispatch(dispatch, actionName) {
  return action => dispatch(actionName, action, { root: true });
}

export default function createfluxAction(actionName) {
  return (contenxt, action) => {
    const { dispatch, commit } = contenxt;
    const { type, payload, meta } = action;
    const dispatchFluxAction = createFluxActionDispatch(dispatch, actionName);
    const safeCommit = (mutaion) => {
      try {
        commit(mutaion);
      } catch (error) {
        // do nothing
      }
    };

    // 处理 api
    if (meta && meta.API) {
      if (!isPromise(payload)) {
        throw new Error('dispatch API request payload to be a promise!');
      }

      safeCommit(genPendingType(type));

      return payload
        .then(response => response.json())
        .then((json) => {
          if (json.code !== 200) {
            throw new ServerException(json.msg || '发生错误！');
          }

          safeCommit(genSuccessType(type), {
            ...action,
            payload: json.data,
          });
        })
        .catch((error) => {
          if (process.env.NODE_ENV === 'development') {
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
        result =>
          commit({
            ...action,
            payload: result,
          }),
        (error) => {
          commit({
            ...action,
            payload: error,
            error: true,
          });
          Promise.reject(error);
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
