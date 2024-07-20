import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import message from "./reducers/message";
import { authReducer } from "./reducers/userReducers";
import { apiReducer } from "./reducers/apiReducers";
import { tikectReducer } from "./reducers/ticketReducers";
import { GetAllUsers } from "./reducers/commonReducers";

const reducer = combineReducers({
  message: message,
  auth: authReducer,
  api: apiReducer,
  ticket: tikectReducer,
  allUser: GetAllUsers,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
