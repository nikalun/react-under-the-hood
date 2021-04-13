import updateDomProperties from "./updateDomProperties";
import instantiate from "./instantiate";
// eslint-disable-next-line import/no-cycle
import reconcileChildren from "./reconcicleChildren";

const reconcile = (parentDom, instance, element) => {
  if (instance == null) {
    // Создаём инстанс
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }
  if (element == null) {
    // Убираем инстанс
    parentDom.removeChild(instance.dom);
    return null;
  }
  // eslint-disable-next-line
  if (instance.element.type == element.type) {
    // Обновляем инстанс
    updateDomProperties(instance.dom, instance.element.props, element.props);
    // eslint-disable-next-line
    instance.childInstances = reconcileChildren(instance, element);
    // eslint-disable-next-line
    instance.element = element;
    return instance;
  }
  if (typeof element.type === "string") {
    // Обновляем инстанс DOM-элемента
    updateDomProperties(instance.dom, instance.element.props, element.props);
    // eslint-disable-next-line
    instance.childInstances = reconcileChildren(instance, element);
    // eslint-disable-next-line
    instance.element = element;
    return instance;
  }
  // Обновляем инстанс компонента
  // eslint-disable-next-line
  instance.publicInstance.props = element.props;
  const childElement = instance.publicInstance.render();
  const oldChildInstance = instance.childInstance;
  const childInstance = reconcile(parentDom, oldChildInstance, childElement);
  // eslint-disable-next-line
  instance.dom = childInstance.dom;
  // eslint-disable-next-line
  instance.childInstances = childInstance;
  // eslint-disable-next-line
  instance.element = element;
  return instance;
};

export default reconcile;
