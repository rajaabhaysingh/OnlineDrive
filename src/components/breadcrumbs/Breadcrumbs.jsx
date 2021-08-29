import React from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

// styles
import useGlobalStyles from "../../styles/jss/globalStyles";

// icons
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      cursor: "pointer",
    },
    padding: "4px 12px",
    fontSize: "0.85rem",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
}));

export default function CustomizedBreadcrumbs({
  backlinks,
  currentLabel,
  handleBreadcrumbsClick,
}) {
  const classes = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {backlinks.map((item, i) => (
        <div
          className={
            i === backlinks.length - 1 && i !== 0 ? "fc fss" : classes.root
          }
          key={i}
          onClick={() => handleBreadcrumbsClick(i)}
        >
          {i === 0 && (
            <HomeIcon style={{ margin: "0 8px 2px 0", fontSize: "1rem" }} />
          )}
          <div className={globalCls}>{item.label}</div>
        </div>
      ))}

      {currentLabel && <div className={globalCls.txtSmSec}>{currentLabel}</div>}
    </Breadcrumbs>
  );
}
