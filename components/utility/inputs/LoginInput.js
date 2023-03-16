import { BiUser } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
import { SiMinutemailer } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { ErrorMessage, useField } from "formik";

const LoginInput = ({ icon, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  let iconType =
    icon === "user" ? (
      <BiUser />
    ) : icon === "email" ? (
      <MdEmail />
    ) : icon === "password" ? (
      <IoKeyOutline />
    ) : (
      ""
    );
  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""
      } `}
    >
      {iconType}
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error__popup}>
          <ErrorMessage name={field.name} />
          <span></span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginInput;
