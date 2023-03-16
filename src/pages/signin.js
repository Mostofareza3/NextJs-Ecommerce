import Footer from "components/footer";
import Header from "components/header";
import React from "react";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import LoginInput from "components/utility/inputs/LoginInput";

const signin = () => {
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
            <Formik>
              {(form) => (
                <Form>
                  <LoginInput icon="user" placeholder="Your Email" />
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

export default signin;
