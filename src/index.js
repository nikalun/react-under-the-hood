import reconcile from "./reconcicle";

class OwnReact {
  constructor() {
    this.rootInstance = null;
  }

  static createElement(type, props, ...children) {
    const currentChildren = children.map(child =>
      typeof child === "string" ? this.createTextElement(child) : child
    );

    let element = {
      type,
      props: {
        ...props,
        children: Array.isArray(currentChildren[0])
          ? currentChildren[0]
          : currentChildren
      }
    };

    if (typeof type === "function") {
      element = type(element.props);
    }

    return element;
  }

  static createTextElement(text) {
    return {
      type: "text",
      props: {
        value: text,
        children: []
      }
    };
  }

  static render(element, container) {
    console.log('render')
    const prevInstance = this.rootInstance;
    // eslint-disable-next-line new-cap
    const Element = new element();

    const renderElement = {
      type: element,
      props: {
        ...Element.props,
        children: []
      }
    };

    this.rootInstance = reconcile(container, prevInstance, renderElement);
  }
}

export default OwnReact;
