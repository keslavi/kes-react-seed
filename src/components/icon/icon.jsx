import { useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeSharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBack from '@mui/icons-material/ArrowBack';

/**
 * Available icon keys for the Icon component
 * @typedef {'complete' | 'completeContain' | 'completeOutline' | 'uncomplete' | 'forwardArrow' | 'arrow' | 'arrowForward' | 'backArrow' | 'arrowBack' | 'arrowBackward' | 'expanded' | 'expand' | 'add' | 'remove'} IconTypeMap
 */

/**
 * Predefined icon components from Material-UI.
 * Use these as values for the Icon component's `src` prop.
 * @type {Object.<IconTypeMap, import('react').ComponentType>}
 */
export const iconType = {
  complete: CheckCircleIcon,
  completeContain: CheckCircleIcon,
  completeOutline: CheckCircleOutlineIcon,
  uncomplete: PanoramaFishEyeSharpIcon,
  forwardArrow: ArrowForwardIosIcon,
  arrow: ArrowForwardIosIcon,
  arrowForward: ArrowForwardIosIcon,
  backArrow: ArrowBack,
  arrowBack: ArrowBack,
  arrowBackward: ArrowBack,
  expanded: ExpandMoreIcon,
  expand: ExpandMoreIcon,
  accordion: ExpandMoreIcon,
  add: AddIcon,
  remove: RemoveIcon,
};

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 28,
}

const arrowSizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
}

/**
 * Renders an icon with optional text and configurable styling.
 * @param {import('react').ComponentType<IconTypeMap>} props.src - Icon component from iconType (use iconType.complete, iconType.arrow, etc.) or any MUI Icon
 * @param {string} [props.text] - Optional text to display next to the icon
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Size of the icon
 * @param {('sm'|'md'|'lg')} [props.fontSize] - Font size (defaults to size value)
 * @param {boolean} [props.expanded=false] - Initial expanded state for rotation (uncontrolled)
 * @param {Function} [props.onClick] - Click handler (sets cursor to pointer when provided)
 * @param {('left'|'right')} [props.textPosition='right'] - Position of text relative to icon
 * @param {string} [props.className='iconRoot'] - CSS class name
 * @param {string} [props.colorIcon] - Custom icon color override
 * @param {string} [props.color='inherit'] - Text color
 * @param {boolean} [props.bold] - Whether text should be bold (font-weight: 600)
 * @returns {JSX.Element|null} Rendered icon with optional text, or null if no src provided
 */
export const Icon = ({
  src,
  text,
  size = "md",
  fontSize = size,
  expanded = false,
  textPosition = "right",
  className = "iconRoot",
  colorIcon,
  color = "inherit",
  bold,
  ...props
}) => {
  const [isExpanded0, setIsExpanded0] = useState(expanded);

  const IconComponent = src;

  if (!src) return null;

  const isExpandIcon = src === iconType.expanded || src === iconType.expand || src === iconType.accordion;

  const getPattern = () => {
    switch (src) {
      case iconType.complete:
      case iconType.completeContain:
      case iconType.completeOutline:
        return { color: "success.main", background: "white" };
      case iconType.uncomplete:
        return { color: 'var(--color-border)', borderRadius: '50%' };
      case iconType.expanded:
      case iconType.expand:
      case iconType.accordion:
        return { color: colorIcon || "primary.main" };
      case iconType.add:
      case iconType.remove:
      case iconType.arrow:
      case iconType.arrowBack:
      case iconType.arrowBackward:
      case iconType.arrowForward:
      case iconType.backArrow:
      case iconType.forwardArrow:
        return { color: colorIcon || 'var(--color-blue-550, #0053c2)' };
      default:
        return {};
    }
  };

  const isArrowIcon = [
    iconType.add,
    iconType.remove,
    iconType.arrow,
    iconType.arrowBack,
    iconType.arrowBackward,
    iconType.arrowForward,
    iconType.backArrow,
    iconType.forwardArrow,
  ].includes(src);

  const sx = {
    color: "inherit",
    ...getPattern(),
  };

  const baseSize = sizeMap[fontSize] || sizeMap.md;
  const fontSize0 = arrowSizeMap[size] || arrowSizeMap.md;

  const iconSize = isArrowIcon ? fontSize0 : baseSize;

  const onClick = (e) => {
    if (isExpandIcon) {
      setIsExpanded0(!isExpanded0);
    }
    props.onClick?.(e);
  };

  const textRender = text && (
    <span style={{
      marginLeft: textPosition === "right" ? 12 : 0,
      marginRight: textPosition === "left" ? 12 : 0,
      color,
      fontSize: fontSize0,
      fontWeight: bold ? '600' : '400',
    }}>
      {text}
    </span>
  );

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        ...((isExpandIcon || props.onClick) && { cursor: 'pointer' }),
        ...sx,
      }}
    >
      {textPosition === "left" && textRender}
      <IconComponent
        sx={{
          ...sx,
          fontSize: iconSize,
          ...(isExpandIcon && { 
            transform: isExpanded0 ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s ease-in-out',
          }),
        }}
        className={className}
        {...props}
      />
      {textPosition === "right" && textRender}
    </span>
  );
};

export default Icon;



