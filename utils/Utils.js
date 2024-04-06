import { useMemo } from "react";

class Utils {
  getCurrentScreenName(navigation) {
    let state = navigation.getState();
    return state.routeNames[state.index];
  }
}

const useUtils = () => {
  return useMemo(() => new Utils(), []);
};

export default useUtils;
