import createPublicInstance from "./createPublicInstance";
import updateDomProperties from "./updateDomProperties";

const instantiate = element => {
  const { type, props } = element;

  const isDomElement = typeof type === "string";

  if (isDomElement) {
    const isTextElement = type === "text";
    const dom = isTextElement
      ? document.createTextNode(props.value)
      : document.createElement(type);

    updateDomProperties(dom, [], props);

    // Добавляем инстансы потомков
    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));
    const instance = { dom, element, childInstances };
    return instance;
  }

  const instance = {};
  const publicInstance = createPublicInstance(element, instance);
  const childElement = publicInstance.render();
  const childInstance = instantiate(childElement);
  const { dom } = childInstance;
  Object.assign(instance, { dom, element, childInstance, publicInstance });

  return instance;
};

export default instantiate;
