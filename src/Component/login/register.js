import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useQuery, gql, useMutation } from "@apollo/client";
import Header from "../templet/header";
import Axios from "axios";
import { Snackbar } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import {
  loggedin_as,
  user_info,
  auth_token,
} from "../../constants/storage-keys";
import { useGoogleLogin } from "react-google-login";
import { loggedinAction } from "../../actions/authorization";
import { google_clint_id } from "../../constants/api";
import { refreshTokenSetup } from "../../constants/refreshToken";
const loginMutation = gql`
  mutation ($email_id: String!, $password: String!) {
    login(input: { email_id: $email_id, password: $password }) {
      status
      message
      data {
        id
        name
        token
        email_id
        user_type
        mobile_no
      }
    }
  }
`;
const REGISTER_MUTATION = gql`
  mutation ($email_id: String, $password: String) {
    register(input: { email_id: $email_id, password: $password }) {
      status
      message
      data {
        id
        name
        email_id
        user_type
        mobile_no
      }
    }
  }
`;

const Register = () => {
  const [error, setError] = useState({ hasError: false, message: "" });
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    email_id: "",
    password: "",
  });

  const rememberUserdata = (response) => {
    localStorage.setItem(user_info, JSON.stringify(response));
    localStorage.setItem(loggedin_as, response.user_type);
    localStorage.setItem(auth_token, response.token);
    dispatch(
      loggedinAction({
        is_loggedin: true,
        loggedin_as: "user",
        user_info: response,
      })
    );
    window.history.go("-1");
    console.log("data1", response);
  };
  const [RegisterMutation, registerRes] = useMutation(REGISTER_MUTATION);
  // const [LoginMutation, loginRes] = useMutation(loginMutation);
  // const SignIn = () => {
  //   LoginMutation({
  //     variables: {
  //       email_id: userDetails.email_id,
  //       password: userDetails.password,
  //     },
  //   }).then((res) => {
  //     const response = res.data.login;
  //     if (response.status) {
  //       rememberUserdata(res.data.login.data);
  //     } else {
  //       setError({ hasError: true, message: response.message });
  //     }
  //   });
  // };
  const resister = () => {
    RegisterMutation({
      variables: {
        email_id: userDetails.email_id,
        password: userDetails.password,
      },
    }).then((res) => {
      const response = res.data;
      console.log(response);
    });
  };
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res);
    RegisterMutation({
      variables: {
        email_id: res.profileObj.email,
        password: res.profileObj.googleId,
      },
    }).then((res) => {
      const response = res.data;
      console.log(response);
    });
    refreshTokenSetup(res);
  };
  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    google_clint_id,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });
  return (
    <>
      <div
        style={{
          textAlign: "center",
          width: "-webkit-fill-available",
          marginTop: "120px",
        }}
      >
        <div
          style={{ textAlign: "left", margin: "-5px 28px", fontSize: "17px" }}
        >
          Email Id
        </div>
        <input
          style={{
            width: "-webkit-fill-available",
            border: "none",
            background: "black",
            outline: "none",
            borderRadius: "22px",
            height: "39px",
            fontSize: "17px",
            padding: "0px 18px 1px 18px",
            margin: "10px 18px",
            color: "white",
          }}
          value={userDetails.email_id}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email_id: e.target.value })
          }
          type="text"
        />
      </div>
      <div
        style={{
          textAlign: "center",
          width: "-webkit-fill-available",
          marginTop: "20px",
        }}
      >
        <div
          style={{ textAlign: "left", margin: "-5px 28px", fontSize: "17px" }}
        >
          Password
        </div>
        <input
          style={{
            width: "-webkit-fill-available",
            border: "none",
            background: "black",
            outline: "none",
            borderRadius: "22px",
            height: "39px",
            fontSize: "17px",
            padding: "0px 18px 1px 18px",
            margin: "10px 18px",
            textTransform: "password",
            color: "white",
          }}
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >
        <button
          style={{
            width: "80%",
            border: "none",
            background: "#0e8a45",
            height: "35px",
            borderRadius: "10px",
            color: "white",
            fontSize: "19px",
            fontWeight: 700,
            outline: "none",
          }}
          onClick={() => {
            resister();
          }}
        >
          Creat account
        </button>
        <button
          onClick={resister}
          style={{
            cursor: "pointer",
            display: "block",
            fontSize: "19px",
            boxSizing: "content-box",
            margin: " 11px auto 0px",
            width: " 70%",
            padding: "5px 20px",
            borderRadius: "10px",
            borderColor: "transparent",
            backgroundColor: "white",
            /* box-shadow: 0px 16px 60px rgba(78, 79, 114, 0.1); */
            boxShadow: "0px 16px 60px rgba(78, 79, 114, 0.08)",
            position: "relative",
            outline: "none",
          }}
        >
          <img
            src="google.svg"
            alt="google login"
            style={{
              height: "25px",
              width: "25px",
              marginRight: "0px",
              position: "absolute",
              left: "30px",
              alignItems: "center",
            }}
          ></img>

          <span style={{ color: "#4285f4", fontWeight: 700 }}>
            Sign in with Google
          </span>
        </button>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={error.hasError}
        autoHideDuration={1000}
        onClose={() => {
          setError({ ...Error, hasError: false });
        }}
        message={error.message}
      />
    </>
  );
};

export default Register;
