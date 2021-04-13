const createPublicInstance = (element, internalInstance) => {
  const { type, props } = element;
  // eslint-disable-next-line
  const publicInstance = new type(props);
  // eslint-disable-next-line
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
};

export default createPublicInstance;
