const instantiate = element => {
  const { type, props } = element;

  const isTextElement = type === "text";
  const dom = isTextElement
    ? document.createTextNode(props.value)
    : document.createElement(type);

  const isListener = name => name.startsWith("on");
  const isAttribute = name => !isListener(name) && name !== "children";

  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name];
    });

  // Добавляем инстансы потомков
  const childElements = props.children || [];

  const childInstances = childElements.map(instantiate);
  const childDoms = childInstances.map(
    childInstance => childInstance && childInstance.dom
  );
  childDoms.forEach(childDom => childDom && dom.appendChild(childDom));
  const instance = { dom, element, childInstances };
  return instance;
};

export default instantiate;
