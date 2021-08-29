/* eslint-disable import/no-anonymous-default-export */
import { fileFolderConstants } from "../actions/constants";
import { nanoid } from "nanoid";

const initialState = {
  rootTree: [
    {
      fileName: "Test folder 1",
      type: "folder",
      fileExtension: null,
      id: nanoid(),
      children: [
        {
          fileName: "Letter.pdf",
          type: "file",
          fileExtension: "pdf",
          id: nanoid(),
          children: null,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    },
    {
      fileName: "ImageFile.png",
      type: "file",
      fileExtension: "png",
      id: nanoid(),
      children: null,
      createdAt: new Date(),
    },
    {
      fileName: "Toddle.pdf",
      type: "file",
      fileExtension: "pdf",
      id: nanoid(),
      children: null,
      createdAt: new Date(),
    },
  ],
};

// addFileFolder - helper f(n)
const addFileFolder = (rootTree, fileName, type, fileExtension, parentId) => {
  // if no parentId - add to root
  if (!parentId || parentId === 1) {
    rootTree.push({
      fileName,
      type,
      fileExtension,
      id: nanoid(),
      children: type === "file" ? null : [],
      createdAt: new Date(),
    });
    return rootTree;
  }

  for (const node of rootTree) {
    if (node.type === "folder" && node.id === parentId) {
      node.children.push({
        fileName,
        type,
        fileExtension,
        parentId,
        id: nanoid(),
        children: type === "file" ? null : [],
        createdAt: new Date(),
      });
      break;
    }

    node.type === "folder" &&
      node.children?.length > 0 &&
      addFileFolder(node.children, fileName, type, fileExtension, parentId);
  }

  return rootTree;
};

// renameFileFolder
const renameFileFolder = (rootNode, targetId, newName) => {
  if (!targetId) {
    return rootNode;
  }

  for (let obj of rootNode) {
    if (obj.id === targetId) {
      obj.fileName = newName;
      if (obj.type === "file") {
        let splitArray = newName.split(".");

        obj.fileExtension =
          splitArray.length > 1 ? splitArray[splitArray.length - 1] : null;
      }
      return rootNode;
    }

    if (obj.type === "folder" && obj.children?.length > 0) {
      renameFileFolder(obj.children, targetId, newName);
    }
  }

  return rootNode;
};

// deleteFileFolder
const deleteFileFolder = (rootNode, targetId) => {
  if (!targetId) {
    return rootNode;
  }

  for (let i = 0; i < rootNode.length; i++) {
    if (rootNode[i].id === targetId) {
      rootNode.splice(i, 1);
      return rootNode;
    }

    if (rootNode[i].children?.length > 0) {
      deleteFileFolder(rootNode[i].children, targetId);
    }
  }

  return rootNode;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case fileFolderConstants.ADD_FILE_FOLDER_REQUEST:
      state = {
        ...state,
        rootTree: addFileFolder(
          state.rootTree,
          action.payload.fileName,
          action.payload.type,
          action.payload.fileExtension,
          action.payload.parentId
        ),
      };
      break;

    case fileFolderConstants.RENAME_FILE_FOLDER_REQUEST:
      state = {
        ...state,
        rootTree: renameFileFolder(
          state.rootTree,
          action.payload.targetId,
          action.payload.newName
        ),
      };
      break;

    case fileFolderConstants.DELETE_FILE_FOLDER_REQUEST:
      state = {
        ...state,
        rootTree: deleteFileFolder(state.rootTree, action.payload.targetId),
      };
      break;

    default:
      break;
  }

  return state;
};
