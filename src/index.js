class OwnReact {
  constructor() {
    this.rootInstance = null;
  }

  static createElement(...args) {
    const object = {
      type: args[0]
    };

    const isText = typeof args[2] === "string" || typeof args[2] === "number";
    let children = [];

    if (isText) {
      children = [
        {
          type: "text",
          props: {
            value: args[2]
          }
        }
      ];
    } else {
      const isArray = Array.isArray(args[2].props?.children);

      children = isArray ? args[2].props.children[0] : args.slice(2);
    }

    object.props = {
      ...object.props,
      children
    };

    return object;
  }

  static render(element, container) {
    const prevInstance = this.rootInstance;
    this.rootInstance = this.reconcile(container, prevInstance, element);
  }

  static instantiate(element) {
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

    const childInstances = childElements.map(this.instantiate.bind(this));
    const childDoms = childInstances.map(
      childInstance => childInstance && childInstance.dom
    );
    childDoms.forEach(childDom => childDom && dom.appendChild(childDom));
    const instance = { dom, element, childInstances };
    return instance;
  }

  static updateDomProperties(dom, prevProps, nextProps) {
    const isEvent = name => name.startsWith("on");
    const isAttribute = name => !isEvent(name) && name !== "children";

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
  }

  static reconcileChildren(instance, element) {
    const { dom } = instance;
    const { childInstances } = instance;
    const nextChildElements = element.props.children || [];
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElements.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < count; i++) {
      const childInstance = childInstances[i];
      const childElement = nextChildElements[i];
      const newChildInstance = this.reconcile(dom, childInstance, childElement);
      newChildInstances.push(newChildInstance);
    }
    return newChildInstances.filter(newInstance => newInstance != null);
  }

  static reconcile(parent, instance, element) {
    if (instance == null) {
      const newInstance = this.instantiate(element);
      parent.appendChild(newInstance.dom);
      return newInstance;
    }

    if (element === null) {
      parent.removeChild(instance.dom);
      return null;
    }

    if (instance.element.type === element.type) {
      this.updateDomProperties(
        instance.dom,
        instance.element.props,
        element.props
      );
      // eslint-disable-next-line no-param-reassign
      instance.childInstances = this.reconcileChildren(instance, element);
      // eslint-disable-next-line no-param-reassign
      instance.element = element;
      return instance;
    }

    const newInstance = this.instantiate(element);
    parent.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }
}

export default OwnReact;
