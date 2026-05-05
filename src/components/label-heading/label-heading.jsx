import { useId } from "react";
import { Info } from "@formhelper";
import { InfoLabelHeading } from "./info-label-heading";

/**
 * @property {enum}
 * @param h1 large blue font
 * @param h2 medium blue font
 * @param h3 small blue font
 * @param h4 small blue font
 * @param h5 small blue font
 * @param h6 small blue font
 */
export const labelHeadingVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  h1b: "h1b",
};

/**
 * @property {label}
 * @param variant h1,h2, h3... use string or enum labelHeadingVariant
 * @returns {label formatted by variant}
 */
export const LabelHeading = (props) => {
  const reactId = useId();
  const id = props.id ?? reactId.replace(/:/g, "");

  const variantKey = (props.variant || "").toUpperCase();
  const classNames = ["labelHeadingRoot", `labelHeading${variantKey}`];

  if (props.light) classNames.push("light");
  if (props.bold) classNames.push("bold");
  if (props.boldish) classNames.push("boldish");
  if (props.regular) classNames.push("regular");
  if (props.dark) classNames.push("dark");
  if (props.errorColor) classNames.push("errorColor");
  if (props.disabled) classNames.push("disabled");
  if (props.link) classNames.push("link");

  const className = classNames.join(" ");
  const headingColor = props.headingColor;

  const inlineStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    ...(headingColor && { color: headingColor }),
  };

  return (
    <span
      className={className}
      style={inlineStyle}
      onClick={props.onClick}
    >
      {props.children}
      {props.info && <InfoLabelHeading info={props.info} />}
      {props.infoquestion && (
        <span style={{ position: "relative", left: "4%" }}>
          <Info id={`${id}Info`} info={props.infoquestion} />
        </span>
      )}
    </span>
  );
};

export default LabelHeading;
