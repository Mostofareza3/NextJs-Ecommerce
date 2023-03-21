import Footer from "components/footer";
import Header from "components/header";
import React, { useState } from "react";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import LoginInput from "components/utility/inputs/LoginInput";
import * as Yup from "yup";
import CircleIconButton from "components/utility/buttons/CircleIconButton";
import {
  getProviders,
  signIn,
  getCsrfToken,
  getSession,
} from "next-auth/react";
import axios from "axios";
import DotLoader from "./../../components/loaders/dotLoader.js/DotLoader";
import Router from "next/router";

const initialValues = {
  login_email: "",
  login_password: "",
  login_error: "",
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  success_message: "",
  error_message: "",
};

const SignIn = ({ providers, callbackUrl, csrfToken }) => {
  const [user, setUser] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const {
    login_email,
    login_password,
    login_error,
    name,
    email,
    password,
    confirm_password,
    success_message,
    error_message,
  } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    login_password: Yup.string().required("Password is required"),
  });

  const registrationValidation = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name is too short")
      .max(20, "Name shuold be less than 20 characters")
      .matches(/^[aA-zZ\s]+$/, "Name should only contain alphabets"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, success_message: data.message, error_message: "" });
      setLoading(false);

      setTimeout(async () => {
        setUser(initialValues);
        let options = {
          redirect: false,
          email,
          password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setUser({
        ...user,
        success_message: "",
        error_message: err.response.data.message,
      });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success_message: res.message, error_message: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({
        ...user,
        success_message: "",
        login_error: res.error,
      });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              we&#39;d be happy to join us!
              <Link href="/"> Go Store </Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best E-shopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
                login_error,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_email"
                    onChange={handleChange}
                    icon="email"
                    placeholder="Enter Your Email"
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    onChange={handleChange}
                    icon="password"
                    placeholder="Enter Your Password"
                  />
                  <CircleIconButton type="submit" text="sign in" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot Password?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers &&
                  providers.map((provider) => {
                    if (provider.name === "Credentials") return;
                    return (
                      <div key={provider.name}>
                        <button
                          className={styles.social__btn}
                          onClick={() => signIn(provider.id)}
                        >
                          <img
                            src={`../../icons/${provider.name}.png`}
                            alt=""
                          />
                          Sign in with {provider.name}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best E-shopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                confirm_password,
              }}
              validationSchema={registrationValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="confirm_password"
                    icon="password"
                    placeholder="Re-Enter Your Password"
                    onChange={handleChange}
                  />
                  <CircleIconButton type="submit" text="sign in" />
                </Form>
              )}
            </Formik>
            <div>
              {error_message && (
                <span className={styles.error}>{error_message}</span>
              )}
            </div>
            <div>
              {success_message && (
                <span className={styles.success}>{success_message}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer country="test country" />
    </>
  );
};

export default SignIn;

export const getServerSideProps = async (context) => {
  const { req, query } = context;
  const { callbackUrl } = query;

  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
        permanent: false,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);

  const providers = Object.values(await getProviders());
  return {
    props: { providers, csrfToken, callbackUrl },
  };
};
