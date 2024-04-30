import * as firebase from "firebase";
import "firebase/firestore";

const getConfig = async () => {
  const fbConfig = await JSON.parse("./config.json");
  return {
    apiKey: fbConfig.apiKey,
    authDomain: fbConfig.authDomain,
    projectId: fbConfig.projectId,
    storageBucket: fbConfig.storageBucket,
    messagingSenderId: fbConfig.messagingSenderId,
    appId: fbConfig.appId,
  };
};

getConfig().then((config) => firebase.initializeApp(config));

const db = firebase.firestore();

export default db;
