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
  } else if (element == null) {
    // Убираем инстанс
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.element.type == element.type) {
    // Обновляем инстанс
    updateDomProperties(instance.dom, instance.element.props, element.props);
    console.log(instance)
    console.log(element)
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else if (typeof element.type == "string") {
    // Обновляем инстанс DOM-элемента
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    // Обновляем инстанс компонента
    instance.publicInstance.props = element.props;
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    instance.dom = childInstance.dom;
    instance.childInstances = childInstance;
    instance.element = element;
    return instance;
  }
};

export default reconcile;
