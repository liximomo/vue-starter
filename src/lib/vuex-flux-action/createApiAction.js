import createAction from './createAction';

export default function createApiAction(type, payloadCreator, metaCreator) {
  const apiMetaCreator = (...args) => ({
    API: true,
    ...(metaCreator ? metaCreator(...args) : {}),
  });

  return createAction(type, payloadCreator, apiMetaCreator);
}
