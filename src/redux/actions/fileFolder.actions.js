import { fileFolderConstants } from "./constants";

// addFileFolderAction
export const addFileFolderAction = (
  fileName,
  type, // whether file or folder
  fileExtension = null,
  parentId = null,
  cb
) => {
  return async (dispatch) => {
    dispatch({
      type: fileFolderConstants.ADD_FILE_FOLDER_REQUEST,
      payload: {
        fileName,
        type,
        fileExtension,
        parentId,
      },
    });

    if (cb) {
      cb();
    }
  };
};

// renameFileFolderAction
export const renameFileFolderAction = (targetId, newName, cb) => {
  return async (dispatch) => {
    dispatch({
      type: fileFolderConstants.RENAME_FILE_FOLDER_REQUEST,
      payload: {
        targetId,
        newName,
      },
    });

    if (cb) {
      cb();
    }
  };
};

// deleteFileFolderAction
export const deleteFileFolderAction = (targetId, cb) => {
  return async (dispatch) => {
    dispatch({
      type: fileFolderConstants.DELETE_FILE_FOLDER_REQUEST,
      payload: {
        targetId,
      },
    });

    if (cb) {
      cb();
    }
  };
};
