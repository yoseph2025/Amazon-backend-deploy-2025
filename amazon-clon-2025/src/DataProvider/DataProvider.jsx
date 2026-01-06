// DataProvider.jsx
import React, { createContext, useReducer } from "react";
import { Reducer, initialState } from "../Utilty/Reducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
