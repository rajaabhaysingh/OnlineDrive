import { combineReducers } from "redux";
import helperReducer from "./helper.reducers";
import fileFolderReducer from "./fileFolder.reducers";

const rootReducer = combineReducers({
  helper: helperReducer,
  fileFolder: fileFolderReducer,
});

export default rootReducer;
