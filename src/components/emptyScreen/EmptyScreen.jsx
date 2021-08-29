import React from "react";
import clsx from "clsx";

// assets
import empty from "../../assets/img/empty.png";

// components
import AddFileFolder from "../addFileFolder/AddFileFolder";

// styles
import useGlobalStyles from "../../styles/jss/globalStyles";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  img: {
    height: "60px",
  },
}));

const EmptyScreen = ({ handleAddFileFolder, title }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className="fccc w-100 h-100 f1 mar_t-64">
      <img src={empty} alt="" className={cls.img} />
      <div className={clsx(globalCls.txtLgSec, "mar_t-16 fwb")}>
        {title ? title : "Uh-oh! Your online drive is empty."}
      </div>
      <div className={clsx(globalCls.txtSmSec, "mar_t-16 mar_b-32")}>
        Click below to add new files/folders here.
      </div>
      <AddFileFolder handleAddFileFolder={handleAddFileFolder} />
    </div>
  );
};

export default EmptyScreen;
