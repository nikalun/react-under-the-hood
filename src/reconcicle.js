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

  if (element == null) {
    parent.removeChild(instance.dom);
    return null;
  }

  if (instance.element.type != element.type) {
    const newInstance = instantiate(element);
    parent.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }

  if (typeof element.type == "string") {
    // Обновляем инстанс DOM-элемента
    updateDomProperties(instance.dom, instance.element.props, element.props);
    // eslint-disable-next-line no-param-reassign
    instance.childInstances = reconcileChildren(instance, element);
    // eslint-disable-next-line no-param-reassign
    instance.element = element;
    return instance;
  }

  // eslint-disable-next-line no-param-reassign
  instance.publicInstance.props = element.props;
  const childElement = instance.publicInstance.render();
  const oldChildInstance = instance.childInstance;
  const childInstance = reconcile(parent, oldChildInstance, childElement);
  // eslint-disable-next-line no-param-reassign
  instance.dom = childInstance.dom;
  // eslint-disable-next-line no-param-reassign
  instance.childInstance = childInstance;
  // eslint-disable-next-line no-param-reassign
  instance.element = element;
  return instance;
};

export default reconcile;
