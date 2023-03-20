import useContextDevTools from "context-api-dev-tools-extension";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import { uiReducer } from "../reducers/uiReducer";
import { userReducer } from "../reducers/userReducer";

type uiType = {
  loading: boolean;
};

type dataType = {
  id?: number;
  login?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  campus?: string;
  cursus_lvl?: string;
  game_lvl?: string;
  avatar?: string;
};

type userType = {
  connected: boolean;
  data?: dataType;
};

type stateType = {
  user: userType;
  ui: uiType;
  data: dataType[];
};

const initialState: stateType = {
  user: {
    connected: false,
    data: {},
  },
  ui: {
    loading: false,
  },
  data: [],
};
const GlobalContext = createContext<{
  state: stateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const GlobalProvider = ({ children }: any) => {
  const [globalReducer, initialGlobalState] = combineReducers({
    user: [userReducer, initialState.user],
    ui: [uiReducer, initialState.ui],
  });

  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

  const devTools = useContextDevTools(dispatch);

  useEffect(() => {
    devTools.sendUpdatedState(state);
  }, [state, devTools]);

  return (
    <GlobalContext.Provider value={{ state, dispatch: devTools.sendDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
