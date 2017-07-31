const defaultState = {
  username: 'liximomo',
};

// mutations
function userNameMt(state, username) {
  state.username = username;
}

// getters
function userGt(state) {
  return state.username;
}

// mutation types
export const SET_USERNAME = 'SET_USERNAME';

export default {
  state: defaultState,
  getters: {
    user: userGt,
  },
  mutations: {
    [SET_USERNAME]: userNameMt,
  },
};
