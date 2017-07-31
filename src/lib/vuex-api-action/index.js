function genPendingType(type) {
  return `${type}--PENDING`;
}

function genSuccessType(type) {
  return `${type}--DONE`;
}

function genFailType(type) {
  return `${type}--FAIL`;
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function ServerException(message) {
  this.message = message;
  this.name = 'ServerException';
}

export default function apiAction({ commit, state }, { type, payload, ...rest } = {}) {
  if (!isPromise(payload)) {
    throw new Error('dispatchApi request payload to be a promise!');
  }

  commit(genPendingType(type));

  payload
    .then(response => response.json())
    .then((json) => {
      if (json.code !== 200) {
        throw new ServerException(json.msg || '发生错误！');
      }

      commit(genSuccessType(type), {
        payload: json.data,
        ...rest,
      });
    })
    .catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }

      commit(genFailType(type), {
        payload: error,
        error: true,
        ...rest,
      });
    });
}

export function plug2Store(store, actionName) {
  store.dispatchApi = action => store.dispatch(actionName, action, { root: true });
}
