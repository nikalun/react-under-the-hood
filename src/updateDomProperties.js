const isEvent = name => name.startsWith("on");
const isAttribute = name => !isEvent(name) && name !== "children";

const updateDomProperties = (dom, prevProps, nextProps) => {
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => {
      // eslint-disable-next-line no-param-reassign
      dom[name] = null;
    });

  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => {
      // eslint-disable-next-line no-param-reassign
      dom[name] = nextProps[name];
    });

  Object.keys(nextProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};

export default updateDomProperties;
