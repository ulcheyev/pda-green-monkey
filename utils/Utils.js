import { useMemo } from "react";

class Utils {
  getCurrentScreenName(navigation) {
    let state = navigation.getState();
    let currRoute = state.routes[state.index];
    return currRoute.params?.title || currRoute.name;
  }

  getListItemsSize(lizt) {
    let size = 0;
    for (let shop of lizt.shops) {
      size += shop.items.length;
    }
    return size;
  }
}

const useUtils = () => {
  return useMemo(() => new Utils(), []);
};

export default useUtils;
