import React from "react";

export const processChildren = (children, attributes) => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const childHasName = child.props && child.props.name !== undefined;
    const childHasChildren = child.props && child.props.children;

    const clonedChild = childHasName
      ? React.cloneElement(child, { ...attributes })
      : child;

    if (childHasChildren) {
      return React.cloneElement(clonedChild, {
        children: processChildren(child.props.children, attributes),
      });
    }
    return clonedChild;
  });
};
