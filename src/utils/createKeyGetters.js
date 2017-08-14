// create redux state selector
export default function createKeyGetters(obj, namePrefix) {
  return Object.keys(obj).reduce((sels, key) => {
    // eslint-disable-next-line no-param-reassign
    sels[`${namePrefix}${key}`] = state => state[key];
    return sels;
  }, {});
}
