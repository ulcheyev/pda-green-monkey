import { useMemo } from "react";
import { getAuth } from "firebase/auth";
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

  isAuthorized() {
    const auth = getAuth();
    return auth.currentUser != null;
  }
}

const useUtils = () => {
  return useMemo(() => new Utils(), []);
};

export default useUtils;
