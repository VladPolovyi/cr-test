import firebase from "../firebase/Firebase";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/storage";
import { createStore, compose, applyMiddleware } from "redux";
import { getFirebase } from "react-redux-firebase";
import { createFirestoreInstance, getFirestore } from "redux-firestore";
import rootReducer from "../store/reducers";

import thunk from "redux-thunk";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true, // attaches auth is ready promise to store
};

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);



const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export { store, rrfProps };
