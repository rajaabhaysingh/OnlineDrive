import React from "react";
import clsx from "clsx";
import CheckboxTree from "react-checkbox-tree";

// styles
import { Button, Divider, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/jss/globalStyles";

// icons
import { CloudUpload } from "@material-ui/icons";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: "16px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {},
  },
  btn: {
    borderRadius: "0 !important",
    color: theme.palette.common.white,
    height: "44px",
  },
  txt: {
    color: `${theme.palette.text.secondary} !important`,
    fontSize: "0.8rem",
    padding: "5px",
  },
  checkBoxCont: {
    padding: "0 16px",
    position: "relative",
  },
}));

const FileSideDrawer = ({ handleAddFileFolder }) => {
  const globalCls = useGlobalStyles();
  const cls = useStyles();

  const fileFolder = useSelector((state) => state.fileFolder);

  const [state, setState] = React.useState({
    checked: [],
    expanded: [],
  });

  // generateNode
  const generateNode = (treeNode = fileFolder.rootTree, arr = []) => {
    for (let node of treeNode) {
      arr.push({
        label: node.fileName,
        value: node.id,
        className: cls.txt,
        icon:
          node.type === "file" ? (
            <i className="far fa-file"></i>
          ) : (
            <i className="fas fa-folder-open"></i>
          ),
        children: node.children?.length > 0 ? generateNode(node.children) : [],
      });
    }

    return arr;
  };

  return (
    <div className={clsx(cls.root, "fcol")}>
      <Button
        onClick={handleAddFileFolder}
        className={clsx("w-100", cls.btn)}
        variant={"contained"}
        color="primary"
        endIcon={<CloudUpload />}
      >
        ADD NEW FILES / FOLDERS
      </Button>

      <div className={clsx("mar_t-32 fcol", cls.checkBoxCont)}>
        <div className={clsx("fc mar_b-8", globalCls.txtSmSec)}>
          <i className="fas fa-caret-down mar_r-12"></i>
          <i className="fas fa-hdd mar_r-12"></i>
          <div className={globalCls.txtSmSec}>root</div>
        </div>
        <CheckboxTree
          noCascade
          onlyLeafCheckboxes
          nodes={generateNode()}
          checked={state.checked}
          expanded={state.expanded}
          onCheck={(checked) => setState({ ...state, checked })}
          onExpand={(expanded) => setState({ ...state, expanded })}
          iconsClass="fa5"
        />
      </div>
    </div>
  );
};

export default FileSideDrawer;
