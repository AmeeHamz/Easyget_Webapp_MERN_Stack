import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function Login() {
  const [{ dark }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const SignIn = async (e) => {
    e.preventDefault();
    setFormErrors(validate(email, password));

    const resp = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await resp.json();

    console.log(data);

    if (resp.status === 400) {
      console.log(data);
    } else if (resp.status === 401 || resp.status === 402) {
      dark
        ? toast.error(data, {
            theme: "dark",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        : toast.error(data, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      // window.alert(data);
      console.log(data);
    } else {
      dark
        ? toast.success(data, {
            theme: "dark",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        : toast.success(data, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      // window.alert(data);
      console.log(data);

      navigate("/");
    }
  };

  const validate = (value1, value2) => {
    const errors = {};

    if (!value1) {
      errors.email = "Email is required!";
    }

    if (!value2) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  return (
    <>
      <div className={dark ? "dark_login" : "login"}>
        <Link to="/">
          {dark ? (
            <img
              className="signUp__logo"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="dark_login__logo"
            />
          ) : (
            <img
              className="signUp__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
              alt="light_login__logo"
            />
          )}
        </Link>

        <div className={dark ? "dark_login__container" : "login__container"}>
          <h1>Sign-in</h1>

          <form method="POST">
            <h3>E-mail</h3>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {formErrors.email && (
              <p className="error_icon_and_for_Errors_Para">
                <span>
                  <ErrorOutlineIcon className="error_icon" />
                </span>
                <span className="for_Errors_Para">{formErrors.email}</span>
              </p>
            )}

            <h3>Password</h3>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {formErrors.password && (
              <p className="error_icon_and_for_Errors_Para">
                <span>
                  <ErrorOutlineIcon className="error_icon" />
                </span>
                <span className="for_Errors_Para">{formErrors.password}</span>
              </p>
            )}
            <button type="submit" onClick={SignIn} className="loginButton">
              Sign In
            </button>
          </form>

          <p className={dark ? "dark_login_terms" : "login_terms"}>
            By continuing, you agree to the AMAZON CLONE
            <span className={dark ? "dark_login_conds" : "login_conds"}>
              &nbsp; Conditions of Use
            </span>
            &nbsp; and
            <span className={dark ? "dark_login_privacy" : "login_privacy"}>
              &nbsp; Privacy Notice.
            </span>
          </p>
        </div>
        <div className="login_hrline_and_login_new_to_amazon">
          <p className={dark ? "dark_login_hrline" : "login_hrline"}>
            <hr />
          </p>
          <p
            className={
              dark ? "dark_login_new_to_amazon" : "login_new_to_amazon"
            }
          >
            <p>New to Amazon?</p>
          </p>
        </div>

        <div className="whole_create_your_acount_Button">
          <Link to="/signup">
            <button
              className={
                dark
                  ? "dark_create_your_acount_Button"
                  : "create_your_acount_Button"
              }
            >
              Create your Amazon Account
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Login;
