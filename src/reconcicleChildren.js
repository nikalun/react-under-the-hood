// eslint-disable-next-line import/no-cycle
import reconcile from "./reconcicle";

const reconcileChildren = (instance, element) => {
  const { dom } = instance;
  const { childInstances } = instance;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(newInstance => newInstance != null);
};

export default reconcileChildren;
