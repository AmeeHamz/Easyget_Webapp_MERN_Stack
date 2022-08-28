import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
function SignUp() {
  const [{ dark }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [emailInvalid, setEmailInvalid] = useState("");
  const [emailExist, setEmailExist] = useState("");
  const [passInvalid, setPassInvalid] = useState("");
  const [passNotMatch, setPassNotMatch] = useState("");
  const [phoneInvalid, setPhoneInvalid] = useState("");

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const SignUp = async (e) => {
    e.preventDefault();
    setEmailInvalid("");
    setEmailExist("");
    setPassInvalid("");
    setPassNotMatch("");
    setPhoneInvalid("");
    setFormErrors(validate(user));

    const { firstname, lastname, phone, email, password, cpassword } = user;
    const resp = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        phone,
        email,
        password,
        cpassword,
      }),
    });

    const data = await resp.json();

    console.log(data);
    if (resp.status === 400) {
      console.log(data);
    } else if (resp.status === 401) {
      setPhoneInvalid(data);
    } else if (resp.status === 420) {
      setEmailInvalid(data);
    } else if (resp.status === 421) {
      setEmailExist(data);
    } else if (resp.status === 422) {
      setPassInvalid(data);
    } else if (resp.status === 423) {
      setPassNotMatch(data);
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
      // console.log(data);
      // window.alert("Registration Successful");
      // console.log("registeration successful");
      navigate("/login");
    }
  };
  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(user);
  //   }
  // }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    } else if (values.firstname.length < 3) {
      errors.firstname = "Must be 3 characters or more!";
    } else if (values.firstname.length > 20) {
      errors.firstname = "Must be 20 characters or less!";
    }

    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    } else if (values.lastname.length < 3) {
      errors.lastname = "Must be 3 characters or more!";
    } else if (values.lastname.length > 20) {
      errors.lastname = "Must be 20 characters or less!";
    }

    if (!values.phone) {
      errors.phone = "Phone Number is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters!";
    }

    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required!";
    }
    return errors;
  };
  return (
    <>
      <div className={dark ? "dark_signUp" : "signUp"}>
        <Link to="/">
          {dark ? (
            <img
              className="signUp__logo"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="dark_signUp__logo"
            />
          ) : (
            <img
              className="signUp__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
              alt="light_signUp__logo"
            />
          )}
        </Link>

        <div className={dark ? "dark_signUp__container" : "signUp__container"}>
          <h1>Create account</h1>

          <form method="POST">
            <h3>Your first name</h3>
            <input
              type="text"
              placeholder="Enter your first name"
              name="firstname"
              value={user.firstname}
              onChange={handleInputs}
              required
            />
            {formErrors.firstname && (
              <p className="error_icon_and_for_Errors_Para">
                <span>
                  <ErrorOutlineIcon className="error_icon" />
                </span>
                <span className="for_Errors_Para">{formErrors.firstname}</span>
              </p>
            )}
            <h3>Your last name</h3>
            <input
              type="text"
              placeholder="Enter your last name"
              name="lastname"
              value={user.lastname}
              onChange={handleInputs}
              required
            />
            {formErrors.lastname && (
              <p className="error_icon_and_for_Errors_Para">
                <span>
                  <ErrorOutlineIcon className="error_icon" />
                </span>
                <span className="for_Errors_Para">{formErrors.lastname}</span>
              </p>
            )}
            <h3>Phone number</h3>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              name="phone"
              value={user.phone}
              onChange={handleInputs}
              maxlength="12"
              required
            />
            {formErrors.phone && (
              <p className="error_icon_and_for_Errors_Para">
                <span>
                  <ErrorOutlineIcon className="error_icon" />
                </span>
                <span className="for_Errors_Para">{formErrors.phone}</span>
              </p>
            )
              ? formErrors.phone && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">{formErrors.phone}</span>
                  </p>
                )
              : phoneInvalid && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">{phoneInvalid}</span>
                  </p>
                )}
            <h3>E-mail</h3>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleInputs}
              required
            />

            {formErrors.email && (
              <p className="error_icon_and_for_Errors_Para">
                <span>
                  <ErrorOutlineIcon className="error_icon" />
                </span>
                <span className="for_Errors_Para">{formErrors.email}</span>
              </p>
            )
              ? formErrors.email && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">{formErrors.email}</span>
                  </p>
                )
              : emailInvalid && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">{emailInvalid}</span>
                  </p>
                )
              ? emailInvalid && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">{emailInvalid}</span>
                  </p>
                )
              : emailExist && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">{emailExist}</span>
                  </p>
                )}

            <h3>Password</h3>
            <input
              type="password"
              placeholder="At least 8 characters"
              name="password"
              value={user.password}
              onChange={handleInputs}
              required
            />
            {formErrors.password && (
              <p className="error_icon_and_for_Errors_Para">
                <span>
                  <ErrorOutlineIcon className="error_icon" />
                </span>
                <span className="for_Errors_Para">{formErrors.password}</span>
              </p>
            )
              ? formErrors.password && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">
                      {formErrors.password}
                    </span>
                  </p>
                )
              : passInvalid && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span
                      style={{
                        color: "rgb(235 168 0)",
                        fontSize: "12px",
                      }}
                    >
                      {passInvalid}
                    </span>
                  </p>
                )}

            <h3>Re-enter Password</h3>
            <input
              type="password"
              placeholder=""
              name="cpassword"
              value={user.cpassword}
              onChange={handleInputs}
              required
            />
            {formErrors.cpassword && (
              <p className="error_icon_and_for_Errors_Para">
                <span>
                  <ErrorOutlineIcon className="error_icon" />
                </span>
                <span className="for_Errors_Para">{formErrors.cpassword}</span>
              </p>
            )
              ? formErrors.cpassword && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">
                      {formErrors.cpassword}
                    </span>
                  </p>
                )
              : passNotMatch && (
                  <p className="error_icon_and_for_Errors_Para">
                    <span>
                      <ErrorOutlineIcon className="error_icon" />
                    </span>
                    <span className="for_Errors_Para">{passNotMatch}</span>
                  </p>
                )}
            <button
              type="submit"
              name="signup"
              onClick={SignUp}
              className={dark ? "dark_signUpButton" : "signUpButton"}
            >
              Continue
            </button>
          </form>

          <p className={dark ? "dark_SignUp_terms" : "SignUp_terms"}>
            By creating an account, you agree to the AMAZON CLONE
            <span className={dark ? "dark_signUp_conds" : "signUp_conds"}>
              &nbsp; Conditions of Use
            </span>
            &nbsp; and
            <span className={dark ? "dark_signUp_privacy" : "signUp_privacy"}>
              &nbsp; Privacy Notice.
            </span>
          </p>
          <hr className={dark ? "dark_signUP_hrline" : "signUP_hrline"} />
          <p
            className={dark ? "dark_SignUp_already_act" : "SignUp_already_act"}
          >
            Already have an account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span>&nbsp; Sign-In</span>
            </Link>
          </p>
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

export default SignUp;
