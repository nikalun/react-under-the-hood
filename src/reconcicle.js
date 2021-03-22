import updateDomProperties from "./updateDomProperties";
import instantiate from "./instantiate";
// eslint-disable-next-line import/no-cycle
import reconcileChildren from "./reconcicleChildren";

const reconcile = (parent, instance, element) => {
  if (instance == null) {
    const newInstance = instantiate(element);
    parent.appendChild(newInstance.dom);
    return newInstance;
  }

  if (element === null) {
    parent.removeChild(instance.dom);
    return null;
  }

  if (instance.element.type === element.type) {
    updateDomProperties(instance.dom, instance.element.props, element.props);
    // eslint-disable-next-line no-param-reassign
    instance.childInstances = reconcileChildren(instance, element);
    // eslint-disable-next-line no-param-reassign
    instance.element = element;
    return instance;
  }

  const newInstance = instantiate(element);
  parent.replaceChild(newInstance.dom, instance.dom);
  return newInstance;
};

export default reconcile;
