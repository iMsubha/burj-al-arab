import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
firebase.initializeApp(firebaseConfig);
var gprovider = new firebase.auth.GoogleAuthProvider();
const Login = () => {
  const [logedInUser, setLogedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(gprovider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signInUser = { name: displayName, email };
        setLogedInUser(signInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleGoogle}>Google Login</button>
    </div>
  );
};

export default Login;
