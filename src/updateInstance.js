import reconcile from "./reconcicle";

const updateInstance = internalInstance => {
  // eslint-disable-next-line
  console.log(internalInstance);
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  reconcile(parentDom, internalInstance, element);
};

export default updateInstance;
