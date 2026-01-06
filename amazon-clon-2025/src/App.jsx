import React, { useContext, useEffect } from "react";
import Routing from "./Routing";
import { DataContext } from "./DataProvider/DataProvider";
import { type } from "./Utilty/ActionType";
import { auth } from "./Utilty/Firebase";

function App() {
  const { state, dispatch } = useContext(DataContext);
  const { user } = state || {}; // <-- Add safe default

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: type.SET_USER,
        user: authUser || null,
      });
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
}

export default App;
