const createPublicInstance = (Element, internalInstance) => {
  const { props } = Element;
  const publicInstance = new Element(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
};

export default createPublicInstance;
