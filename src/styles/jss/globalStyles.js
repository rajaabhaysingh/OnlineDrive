import { makeStyles } from "@material-ui/core";

const useGlobalStyles = makeStyles((theme) => ({
  menuItemPri: {
    "&:active": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.white,
    },
  },
  marTB_4: {
    marginTop: "4px",
    marginBottom: "4px",
  },
  marLR_4: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  marL8: {
    marginLeft: "8px",
  },
  marT8: {
    marginTop: "8px",
  },
  marT16: {
    marginTop: "16px !important",
  },
  marT32: {
    marginTop: "32px",
  },
  marTB_8: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  sqIconBtn: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  inputSearch: {
    backgroundColor: theme.palette.background.bg,
    height: "38px",
    maxWidth: "600px",
    minWidth: "300px",
    borderRadius: "30px 0 0 30px",
    padding: "0 12px",
    boxSizing: "border-box",
    outline: "none",
    border: `1px solid ${theme.palette.divider}`,
    "&:focus": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flex: "1",
      maxWidth: "100%",
      borderRadius: "4px 0 0 4px",
      "&:focus": {
        border: `1px solid ${
          theme.palette.type === "light"
            ? theme.palette.tertiary.main
            : theme.palette.primary.main
        }`,
      },
    },
  },
  searchBtn: {
    height: "38px",
    width: "60px",
    color: theme.palette.text.white,
    padding: "auto",
    borderRadius: "0 30px 30px 0",
    outline: "none",
    border: "none",
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 4px 4px 0",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.tertiary.main
          : theme.palette.primary.main,
    },
  },
  bodyRoot: {
    backgroundColor: theme.palette.background.bg,
    width: "100%",
    height: "calc(100% - 60px)",
    position: "absolute",
    top: "60px",
    left: "0",
    overflowY: "scroll",
    scrollbarWidth: "none",
    [theme.breakpoints.down("sm")]: {
      top: "60px",
      height: "calc(100% - 60px)",
      transition: "ease-in 0.25s",
    },
  },
  bodyRootTransform: {
    [theme.breakpoints.down("sm")]: {
      transform: "translateY(84px)",
      transition: "ease-in 0.25s",
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  navLink: {
    marginRight: "12px",
    fontSize: "0.85rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    borderRadius: "0 32px 32px 0",
    padding: "12px 16px",
    color: theme.palette.text.secondary,
    borderLeft: `4px solid rgba(0,0,0,0)`,
    flex: "1",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  navLinkActive: {
    color: theme.palette.primary.main,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  simpleLabel: {
    color: theme.palette.text.secondary,
    marginRight: "4px",
    whiteSpace: "nowrap",
  },
  imgContainer: {
    width: "100%",
    paddingTop: "25%",
    position: "relative",
    [theme.breakpoints.between("sm", "md")]: {
      paddingTop: "12.5%",
    },
    [theme.breakpoints.between("md", "xl")]: {
      paddingTop: "8.33%",
    },
    [theme.breakpoints.up("xl")]: {
      paddingTop: "8.33%",
    },
  },
  pclr_mobtb: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  pctb_moblr: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  pctb_moblr_spbw: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  pcMarT8: {
    marginTop: "8px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
    },
  },
  pcPadB16: {
    paddingBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "0",
    },
  },
  pcOfScr: {
    [theme.breakpoints.up("xs")]: {
      overflow: "scroll",
      scrollbarWidth: "none",
    },
  },
  pcTimeAgo: {
    [theme.breakpoints.up("xs")]: {
      position: "absolute",
      top: "0",
      right: "0",
    },
  },
  pcMarL_mobMarT16: {
    marginLeft: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      marginTop: "16px",
    },
  },
  pcMarL_mobMarT32: {
    marginLeft: "32px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      marginTop: "32px",
    },
  },
  pcMarL8: {
    marginLeft: "8px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
    },
  },
  pcMarR16: {
    marginRight: "16px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
    },
  },
  mobMarT8: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "8px",
    },
  },
  mobMarT16: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "16px",
    },
  },
  mobMarL8: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "8px",
    },
  },
  hovActive_cardList: {
    background: theme.palette.divider,
    borderRadius: "33px",
    padding: "1px",
    "&:hover": {
      background: `linear-gradient(${theme.palette.primary.main}, rgba(0,0,0,0))`,
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0",
      padding: "0",
      marginRight: "0",
      marginBottom: "0",
    },
  },
  hovActive_suggList: {
    background: theme.palette.divider,
    borderRadius: "8px",
    padding: "1px",
    marginBottom: "16px",
    "&:hover": {
      background: `linear-gradient(${theme.palette.primary.main}, rgba(0,0,0,0))`,
    },
  },
  hovActive: {
    background: theme.palette.divider,
    borderRadius: "8px",
    padding: "1px",
    marginRight: "16px",
    "&:hover": {
      background: `linear-gradient(${theme.palette.primary.main}, rgba(0,0,0,0))`,
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "8px",
    },
  },
  pad_lr_8_16: {
    paddingLeft: "16px",
    paddingRight: "16px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  pad_8_16: {
    padding: "16px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
  pad_0_32: {
    padding: "32px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  custMobList: {
    [theme.breakpoints.down("sm")]: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: "8px",
    },
  },
  txtSmPri: {
    fontSize: "0.8rem",
    color: theme.palette.text.primary,
  },
  txtMdPri: {
    fontSize: "0.9rem",
    color: theme.palette.text.primary,
  },
  txtLgPri: {
    fontSize: "1.2rem",
    color: theme.palette.text.primary,
  },
  txtSmSec: {
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
  },
  txtMdSec: {
    fontSize: "0.9rem",
    color: theme.palette.text.secondary,
  },
  txtLgSec: {
    fontSize: "1.2rem",
    color: theme.palette.text.secondary,
  },
  txtSmPriCol: {
    color: theme.palette.primary.main,
    fontSize: "0.8rem",
  },
  txtMdPriCol: {
    color: theme.palette.primary.main,
    fontSize: "0.9rem",
  },
  txtLgPriCol: {
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
  },
  txtLgErr: {
    color: theme.palette.error.main,
    fontSize: "1.2rem",
  },
  txtSmWhite: {
    color: theme.palette.common.white,
    fontSize: "0.8rem",
  },
  txtMdWhite: {
    color: theme.palette.common.white,
    fontSize: "0.9rem",
  },
  txtLgWhite: {
    fontSize: "1.2rem",
    color: theme.palette.common.white,
  },
  txtErr: {
    color: theme.palette.error.main,
    fontSize: "0.7rem",
  },
  smTag: {
    borderRadius: "4px",
    padding: "2px 4px",
    background: theme.palette.primary.main,
    color: theme.palette.text.white,
    fontSize: "0.75rem",
  },
  pill: {
    height: "28px",
    padding: "0 8px",
    borderRadius: "4px",
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    boxShadow: "0 0 4px rgba(0,0,0,0.45)",
    fontSize: "0.8rem",
    color: theme.palette.primary.main,
  },
  mainTitle: {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  subTitle: {
    marginTop: "4px",
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  rounded: {
    borderRadius: "50px",
    textTransform: "none",
  },
  bgDark: {
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  formInput: {
    borderRadius: "4px",
    outline: "none",
    border: `1px solid ${theme.palette.divider}`,
    height: "38px",
    boxSizing: "border-box",
    padding: "0 8px",
    color: theme.palette.text.primary,
    fontSize: "0.9rem",
    background: theme.palette.background.bg,
    "&:hover": {
      borderColor: "rgba(0,0,0,0.2)",
    },
    "&:focus": {
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&:disabled": {
      background: theme.palette.divider,
      color: theme.palette.divider,
    },
  },
  textInput: {
    borderRadius: "4px",
    outline: "none",
    border: `1px solid ${theme.palette.divider}`,
    height: "116px",
    maxHeight: "116px",
    boxSizing: "border-box",
    padding: "8px",
    color: theme.palette.text.primary,
    fontSize: "0.9rem",
    background: theme.palette.background.bg,
    fontFamily: "Arial",
    "&:hover": {
      borderColor: "rgba(0,0,0,0.2)",
    },
    "&:focus": {
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&:disabled": {
      background: theme.palette.divider,
      color: theme.palette.divider,
    },
  },
  formInputSelect: {
    maxHeight: "38px",
    overflow: "hidden",
    display: "flex",
    flex: "1",
    "&:hover": {
      borderColor: "rgba(0,0,0,0.2)",
    },
    "&:focus": {
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&:disabled": {
      background: theme.palette.divider,
      color: theme.palette.divider,
    },
  },
}));

export default useGlobalStyles;
