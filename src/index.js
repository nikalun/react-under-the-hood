import reconcile from "./reconcicle";

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
    this.rootInstance = reconcile(container, prevInstance, element);
  }
}

export default OwnReact;
