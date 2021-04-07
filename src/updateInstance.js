import reconcile from "./reconcicle";

const updateInstance = internalInstance => {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;
  reconcile(parentDom, internalInstance, element);
};

export default updateInstance;
