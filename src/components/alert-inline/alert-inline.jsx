import { Alert as MuiAlert, AlertTitle } from "@mui/material";
import { color } from "theme-material";

const themeColor = {
  success: "var(--toastify-color-success)",
  info: "var(--toastify-color-info)",
  warning: "var(--toastify-color-warning)",
  error: "var(--toastify-color-error)",
  banner: "#F2F8FC",
}

/**
 * @param {string} type - success, info, warning, error, banner.
 * @param {string|React.ReactNode} message - string or jsx.
 * @param {string|React.ReactNode} children - (usually message)
 * @param {string} title - optional title.
 * @param {false|React.ReactElement|null} icon - optional `false` for no icon, a MuiIcon element for custom icon, or `null` (default) for default icon.
 */
export const AlertInline = ({
  type = "info",
  title = null,
  icon,
  children,
  variant,
  message = "",
  ...props
}) => {

  const alertColor = themeColor[type] || themeColor.info;
  const content = children || message || "no message or children provided";
  const resolvedVariant = type === "banner" ? "contained" : variant;
  
  // Determine icon prop: false/"false" = hide, custom icon = use it, otherwise = default
  let iconProps = {};
  if (icon === false || icon === "false") {
    iconProps = { icon: false };
  } else if (icon) {
    iconProps = { icon };
  }

  const sx = {
    border: `1px solid ${alertColor}`,
    backgroundColor: type==="banner" ? themeColor.banner : "var(--color-white)",
    color: 'color: color.cobe1.black',
    svg: {
      color: alertColor, //icon color
    },
    ...props.sx,
  };

  return (
    <MuiAlert
      severity={type}
      variant={resolvedVariant}
      {...iconProps}
      sx={sx}
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {content}
    </MuiAlert>
  );
}
  

