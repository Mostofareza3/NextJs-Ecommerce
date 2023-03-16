import Footer from "components/footer";
import Header from "components/header";
import React, { useState } from "react";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import LoginInput from "components/utility/inputs/LoginInput";
import * as Yup from "yup";

const initialValues = {
  login_email: "",
  login_password: "",
};

const SignIn = () => {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    login_password: Yup.string().required("Password is required"),
  });

  console.log(user);

  return (
    <>
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
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="test country" />
    </>
  );
};

export default SignIn;
