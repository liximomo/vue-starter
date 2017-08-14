import createKeyGetters from '../utils/createKeyGetters';

const defaultState = {
  username: 'liximomo',
};

// mutations
function userNameMt(state, username) {
  state.username = username;
}

export const USER_SET_USERNAME = 'USER_SET_USERNAME';

export default {
  state: defaultState,
  getters: {
    ...createKeyGetters(defaultState, 'user$'),
  },
  mutations: {
    [USER_SET_USERNAME]: userNameMt,
  },
};
