import React from "react";
import clsx from "clsx";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

// components

// styles
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/jss/globalStyles";

// asset
import fileImg from "../../assets/img/file.png";
import folderImg from "../../assets/img/folder.png";
import EmptyScreen from "../emptyScreen/EmptyScreen";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  img: {
    width: "66px",
  },
  imgCont: {
    height: "108px",
    width: "108px",
    borderRadius: "8px",
    boxSizing: "border-box",
    position: "relative",
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
  itemCont: {
    maxWidth: "108px",
    overflow: "hidden",
  },
  maxW108: {
    maxWidth: "108px",
  },
  ext: {
    position: "absolute",
    maxWidth: "76px",
    bottom: "8px",
    left: "8px",
    borderRadius: "4px",
    padding: "2px 8px",
    fontSize: "0.8rem",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
  },
}));

const FileFolderView = ({
  handleAddFileFolder,
  node,
  handleFolderDoubleClick,
  handleContextMenuClick,
}) => {
  const globalCls = useGlobalStyles();
  const cls = useStyles();

  const helper = useSelector((state) => state.helper);
  const fileFolder = useSelector((state) => state.fileFolder);

  const [filesList, setFilesList] = React.useState([]);
  const [foldersList, setFoldersList] = React.useState([]);

  React.useEffect(() => {
    let tempFolderList = [],
      tempFileList = [];

    for (const child of node) {
      if (helper.searchText) {
        if (
          child.fileName.toLowerCase().includes(helper.searchText.toLowerCase())
        ) {
          if (child.type === "folder") {
            tempFolderList.push(child);
          } else {
            tempFileList.push(child);
          }
        }
      } else {
        if (child.type === "folder") {
          tempFolderList.push(child);
        } else {
          tempFileList.push(child);
        }
      }
    }

    setFilesList(tempFileList);
    setFoldersList(tempFolderList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helper.searchText, node, fileFolder]);

  return (
    <div className="fcol w-100 pad-16 bb">
      {foldersList.length > 0 && (
        <div className="fcol w-100 mar_b-16">
          <div className="fwrap">
            {foldersList.map((folder) => (
              <div
                className={clsx("fccc mar-8", cls.itemCont)}
                key={folder.id}
                onDoubleClick={(e) =>
                  handleFolderDoubleClick(e, folder.id, folder.fileName)
                }
              >
                <ContextMenuTrigger id={folder.id}>
                  <div className={clsx(cls.imgCont, "fcc")}>
                    <img src={folderImg} className={cls.img} alt="" />
                  </div>
                </ContextMenuTrigger>
                <ContextMenu id={folder.id}>
                  <MenuItem
                    data={{
                      option: "rename",
                      id: folder.id,
                      fileName: folder.fileName,
                    }}
                    onClick={handleContextMenuClick}
                  >
                    Rename
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem
                    data={{
                      option: "delete",
                      id: folder.id,
                      fileName: folder.fileName,
                    }}
                    onClick={handleContextMenuClick}
                  >
                    Delete
                  </MenuItem>
                </ContextMenu>
                <div
                  className={clsx(
                    "mar_t-4 ellipsis",
                    globalCls.txtSmPri,
                    cls.maxW108
                  )}
                >
                  {folder.fileName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {filesList.length > 0 && (
        <div className="fcol w-100">
          <div className="fwrap">
            {filesList.map((file) => (
              <div className={clsx("fccc mar-8", cls.itemCont)} key={file.id}>
                <ContextMenuTrigger id={file.id}>
                  <div className={clsx(cls.imgCont, "fcc")}>
                    <img src={fileImg} className={cls.img} alt="" />
                    {file.fileExtension && (
                      <div className={clsx(cls.ext, "ellipsis")}>
                        {file.fileExtension}
                      </div>
                    )}
                  </div>
                </ContextMenuTrigger>
                <ContextMenu id={file.id}>
                  <MenuItem
                    data={{
                      option: "rename",
                      id: file.id,
                      fileName: file.fileName,
                    }}
                    onClick={handleContextMenuClick}
                  >
                    Rename
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem
                    data={{
                      option: "delete",
                      id: file.id,
                      fileName: file.fileName,
                    }}
                    onClick={handleContextMenuClick}
                  >
                    Delete
                  </MenuItem>
                </ContextMenu>
                <div
                  className={clsx(
                    "mar_t-4 ellipsis",
                    globalCls.txtSmPri,
                    cls.maxW108
                  )}
                >
                  {file.fileName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {filesList.length === 0 && foldersList.length === 0 && (
        <EmptyScreen
          title="This folder is empty."
          handleAddFileFolder={handleAddFileFolder}
        />
      )}
    </div>
  );
};

export default FileFolderView;
