import React, { useState } from "react";
import { auth, fb } from "../firebase/firebase";

const Login = (props) => {
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(new fb.auth.GoogleAuthProvider())
      .then((res) => {
        console.log(res.user);
        props.onUserLogin(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: 0,
        zIndex: "2",
        width: "100%",
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
      }}
    >
      <img
        className="hoverable"
        onClick={signInWithGoogle}
        src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Font_Awesome_5_brands_google.svg"
        alt="google logo"
        style={{
          width: "100px",
          height: "100px",
        }}
      ></img>
      <h1
        className="hoverable"
        style={{ fontWeight: 900, fontFamily: "revert" }}
      >
        Log In
      </h1>
    </div>
  );
};

export default Login;
