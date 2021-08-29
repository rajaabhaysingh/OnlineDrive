import { Button, Divider, IconButton, Modal } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

// components
import {
  HeaderMain,
  Breadcrumbs,
  EmptyScreen,
  FileFolderView,
  FileSideDrawer,
  AddFileFolder,
} from "../components";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  addFileFolderAction,
  deleteFileFolderAction,
  renameFileFolderAction,
} from "../redux/actions";

// styles + mui
import { makeStyles, Hidden } from "@material-ui/core";
import useGlobalStyles from "../styles/jss/globalStyles";

// icons
import { ArrowLeft, Delete, Save } from "@material-ui/icons";

// assets
import backIcon from "../assets/img/arrow_up.png";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  leftPane: {
    width: "280px",
    height: "100%",
    overflowY: "scroll",
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  iconBtnImg: {
    marginRight: "8px",
    transform: "rotate(270deg)",
  },
  breadcrumbsContainer: {
    padding: "8px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {},
  },
  switch: {
    borderRadius: "4px",
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    fontSize: "0.9rem",
  },
  switchActive: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: "8px",
    width: "50px",
    textAlign: "center",
  },
  switchInactive: {
    padding: "8px",
    width: "50px",
    cursor: "pointer",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  input: {
    width: "70%",
  },
  fab: {
    position: "fixed",
    bottom: "32px",
    right: "32px",
  },
  modal: {
    backgroundColor: theme.palette.background.bg,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "0 4px 8px #333",
    padding: "32px 64px",
    width: "90vw",
    maxWidth: "520px",
    maxHeight: "70vh",
    overflowY: "scroll",
    zIndex: 99999,
    marginTop: "60px",
    borderRadius: "16px",
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  errBtn: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
}));

// findRecursively
const findRecursively = (treeNode, targetId) => {
  for (const node of treeNode) {
    if (node.type === "folder" && node.id === targetId) {
      return node;
    }

    if (node.type === "folder" && node.children?.length > 0) {
      let temp = findRecursively(node.children, targetId);

      if (temp) {
        return temp;
      }
    }
  }

  return null;
};

const Home = () => {
  const globalCls = useGlobalStyles();
  const cls = useStyles();

  const fileFolder = useSelector((state) => state.fileFolder);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isFolder, setIsFolder] = React.useState(false); // track whether file of folder is being created
  const [fileName, setFileName] = React.useState("");
  const [renameDeleteTracker, setRenameDeleteTracker] = React.useState({});
  const [isDuplicate, setIsDuplicate] = React.useState(false);
  const [activeFolder, setActiveFolder] = React.useState({});
  const [isBackDisabled, setIsBackDisabled] = React.useState(true);
  const [action, setAction] = React.useState("into"); // to track whether traversing "into" or "back"
  const [breadcrumbsLinks, setbreadcrumbsLinks] = React.useState([
    {
      id: 1,
      label: "root",
    },
  ]);

  // storing contents of active folder [root by default]
  const [activeFolderContents, setActiveFolderContents] = React.useState(
    fileFolder.rootTree
  );

  // view changes on every active folder change
  React.useEffect(() => {
    if (activeFolder?.id) {
      let result = null;

      if (activeFolder.id === 1) {
        setActiveFolderContents(fileFolder.rootTree);
      } else {
        result = findRecursively(fileFolder.rootTree, activeFolder.id);
        setActiveFolderContents(result?.children);
      }

      // change breadcrumbs
      if (action === "into" || action === "back") {
        let tempCrumbs = [...breadcrumbsLinks];
        if (action === "into") {
          tempCrumbs.push({
            id: activeFolder.id,
            label: activeFolder.fileName,
          });
        } else if (action === "back") {
          tempCrumbs.pop();
        }

        setbreadcrumbsLinks(tempCrumbs);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFolder]);

  // handleAddFileFolder
  const handleAddFileFolder = () => {
    setIsModalOpen(true);
  };

  // getDuplicateResult
  const getDuplicateResult = (fileName) => {
    for (const item of activeFolderContents) {
      if (item.fileName === fileName) {
        return true;
      }
    }
    return false;
  };

  // handleInputChange
  const handleInputChange = (e) => {
    setFileName(e.target.value);

    if (getDuplicateResult(e.target.value)) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  // createFileFolder
  const createFileFolder = (e) => {
    e.preventDefault();

    let fileNameSplit = fileName.split(".");

    dispatch(
      addFileFolderAction(
        fileName,
        isFolder ? "folder" : "file",
        fileNameSplit.length > 1 ? fileNameSplit.pop() : null,
        activeFolder.id,
        () => {
          setFileName("");
          setIsModalOpen(false);
        }
      )
    );
  };

  // handleFolderDoubleClick
  const handleFolderDoubleClick = (e, folderId, fileName) => {
    setAction("into");

    if (breadcrumbsLinks.length >= 1) {
      setIsBackDisabled(false);
    } else {
      setIsBackDisabled(true);
    }

    // change active folder
    setActiveFolder({
      id: folderId,
      fileName,
    });
  };

  // handleBackClick
  const handleBackClick = () => {
    setAction("back");

    if (breadcrumbsLinks.length === 2) {
      setActiveFolder({
        id: 1,
        fileName: null,
      });
      setIsBackDisabled(true);
    } else if (breadcrumbsLinks.length > 2) {
      setActiveFolder({
        id: breadcrumbsLinks[breadcrumbsLinks.length - 2].id,
        fileName: breadcrumbsLinks[breadcrumbsLinks.length - 2].label,
      });
      setIsBackDisabled(false);
    } else {
      setIsBackDisabled(true);
      return;
    }
  };

  // handleBreadcrumbsClick
  const handleBreadcrumbsClick = (breadcrumbIndex) => {
    setAction("breadcrumbs");

    if (breadcrumbIndex === 0) {
      setbreadcrumbsLinks([
        {
          id: 1,
          label: "root",
        },
      ]);

      setActiveFolder({
        id: 1,
        fileName: null,
      });

      setIsBackDisabled(true);
    } else {
      let tempCrumbs = [...breadcrumbsLinks];
      tempCrumbs = tempCrumbs.splice(0, breadcrumbIndex + 1);

      setActiveFolder({
        id: tempCrumbs[tempCrumbs.length - 1].id,
        fileName: tempCrumbs[tempCrumbs.length - 1].label,
      });

      setbreadcrumbsLinks(tempCrumbs);
    }
  };

  // renameFileFolder
  const renameFileFolder = (e) => {
    e.preventDefault();

    dispatch(
      renameFileFolderAction(
        renameDeleteTracker?.id,
        renameDeleteTracker.fileName,
        () => {
          setRenameDeleteTracker({});
          setIsRenameModalOpen(false);
        }
      )
    );
  };

  // deleteFileFolder
  const deleteFileFolder = () => {
    dispatch(
      deleteFileFolderAction(renameDeleteTracker?.id, () => {
        setRenameDeleteTracker({});
        setIsDeleteModalOpen(false);
      })
    );
  };

  // handleContextMenuClick
  const handleContextMenuClick = (e, data) => {
    setRenameDeleteTracker({
      id: data.id,
      fileName: data.fileName,
    });

    if (data.option === "rename") {
      setIsRenameModalOpen(true);
    } else if (data.option === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <div className="w-100 fcol f1">
      <HeaderMain />
      <div className={globalCls.bodyRoot}>
        <div className="f1 w-100 h-100">
          <Hidden smDown implementation="css">
            <div className={cls.leftPane}>
              <FileSideDrawer handleAddFileFolder={handleAddFileFolder} />
            </div>
          </Hidden>
          <div className="fcol f1">
            <div className={cls.breadcrumbsContainer}>
              {/* back btn */}
              <IconButton
                size="small"
                className={globalCls.marLR_4}
                onClick={handleBackClick}
                disabled={isBackDisabled}
                style={{
                  opacity: isBackDisabled ? 0.25 : 1,
                }}
              >
                <img src={backIcon} alt="" className={cls.iconBtnImg} />
              </IconButton>
              <Breadcrumbs
                backlinks={breadcrumbsLinks}
                handleBreadcrumbsClick={handleBreadcrumbsClick}
              />
            </div>
            <div className="fcol">
              <Divider />
              <div className="">
                {activeFolderContents?.length === 0 ? (
                  <EmptyScreen handleAddFileFolder={handleAddFileFolder} />
                ) : (
                  <FileFolderView
                    handleAddFileFolder={handleAddFileFolder}
                    node={activeFolderContents}
                    handleFolderDoubleClick={handleFolderDoubleClick}
                    handleContextMenuClick={handleContextMenuClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeFolderContents?.length !== 0 && (
        <div className={cls.fab}>
          <AddFileFolder handleAddFileFolder={handleAddFileFolder} />
        </div>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFileName("");
          setIsDuplicate(false);
        }}
        className="fccc"
      >
        <form
          className={clsx(cls.modal, "sb_hid fccc")}
          onSubmit={createFileFolder}
        >
          <div className={globalCls.txtLgSec}>
            <strong>Create new file / folder</strong>
          </div>
          {isDuplicate && (
            <Alert severity="error" className={clsx(cls.input, "mar_t-32")}>
              File/folder with same name already exists.
            </Alert>
          )}
          <div className={clsx(cls.switch, "mar_t-32 fc")}>
            <div
              onClick={() => setIsFolder(false)}
              className={isFolder ? cls.switchInactive : cls.switchActive}
            >
              File
            </div>
            <div
              onClick={() => setIsFolder(true)}
              className={isFolder ? cls.switchActive : cls.switchInactive}
            >
              Folder
            </div>
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-16")}>
            Type new file/folder name:
          </div>
          <input
            autoFocus
            className={clsx(globalCls.formInput, cls.input, "mar_t-8")}
            placeholder={isFolder ? "Enter folder name" : "Enter file name"}
            type="text"
            value={fileName}
            onChange={handleInputChange}
            name="fileName"
            required
          />
          <Button
            className={globalCls.marT32}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isDuplicate}
            startIcon={<Save />}
          >
            CREATE
          </Button>
        </form>
      </Modal>
      <Modal
        open={isRenameModalOpen}
        onClose={() => {
          setIsRenameModalOpen(false);
          setRenameDeleteTracker({});
          setIsDuplicate(false);
        }}
        className="fccc"
      >
        <form
          className={clsx(cls.modal, "sb_hid fccc")}
          onSubmit={(e) => renameFileFolder(e)}
        >
          <div className={globalCls.txtLgSec}>
            <strong>Rename file / folder</strong>
          </div>
          {isDuplicate && (
            <Alert severity="error" className={clsx(cls.input, "mar_t-32")}>
              File/folder with same name already exists.
            </Alert>
          )}
          <div className={clsx(globalCls.txtSmSec, "mar_t-16")}>
            Type new file/folder name:
          </div>
          <input
            autoFocus
            className={clsx(globalCls.formInput, cls.input, "mar_t-8")}
            placeholder="Enter new name"
            type="text"
            value={renameDeleteTracker.fileName}
            onChange={(e) => {
              if (getDuplicateResult(e.target.value)) {
                setIsDuplicate(true);
              } else {
                setIsDuplicate(false);
              }

              setRenameDeleteTracker({
                ...renameDeleteTracker,
                fileName: e.target.value,
              });
            }}
            required
          />
          <Button
            className={globalCls.marT32}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isDuplicate}
            startIcon={<Save />}
          >
            UPDATE
          </Button>
        </form>
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        className="fccc"
      >
        <div className={clsx(cls.modal, "sb_hid fccc")}>
          <div className={globalCls.txtLgSec}>
            <strong>Confirm deletion ?</strong>
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-16")}>
            All the contents of file/folders will be deleted permanently.
            Continue action ?
          </div>
          <Button
            className={clsx(globalCls.marT32, cls.errBtn)}
            variant="contained"
            type="button"
            startIcon={<Delete />}
            onClick={deleteFileFolder}
          >
            DELETE
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
