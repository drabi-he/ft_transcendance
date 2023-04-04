import useContextDevTools from "context-api-dev-tools-extension";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import { dataReducer } from "../reducers/dataReducer";
import { uiReducer } from "../reducers/uiReducer";
import { userReducer } from "../reducers/userReducer";

type uiType = {
  loading: boolean;
};

type rankType = {
  id?: number;
  name?: string;
  requiredPoints?: number;
  upgradePoints?: number;
  emblem?: string;
  border?: string;
};

export type dataType = {
  id?: number;
  login?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  campus?: string;
  cursus_lvl?: string;
  game_lvl?: string;
  avatar?: string;
  rank?: rankType;
};

type userType = {
  connected: boolean;
  data?: dataType;
};

type stateType = {
  user: userType;
  ui: uiType;
  data: {
    search: dataType;
    users: dataType[];
  };
};

const initialState: stateType = {
  user: {
    connected: false,
    data: {},
  },
  ui: {
    loading: false,
  },
  data: {
    search: {},
    users: [],
  },
};
const GlobalContext = createContext<{
  state: stateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const GlobalProvider = ({ children }: any) => {
  const localState = localStorage.getItem("state");

  if (localState) {
    const parsedState = JSON.parse(localState);
    initialState.user = parsedState.user;
    initialState.ui = parsedState.ui;
    initialState.data = parsedState.data;
  }
  const [globalReducer, initialGlobalState] = combineReducers({
    user: [userReducer, initialState.user],
    ui: [uiReducer, initialState.ui],
    data: [dataReducer, initialState.data],
  });

  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

  const devTools = useContextDevTools(dispatch);

  useEffect(() => {
    devTools.sendUpdatedState(state);
    localStorage.setItem("state", JSON.stringify(state));
  }, [state, devTools]);

  return (
    <GlobalContext.Provider value={{ state, dispatch: devTools.sendDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
