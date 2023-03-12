// import { combineReducers } from "redux-immutable";
// import { pokemonsReducer } from "./pokemons";
// import { uiReducer } from "./ui";

import { combineReducers } from "redux";
import dataReducer from "../slices/dataSlice";
import uiReducer from "../slices/uiSlice";

export const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
});
