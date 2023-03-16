import { BiUser } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
import { SiMinutemailer } from "react-icons/si";

const LoginInput = ({ icon, placeholder }) => {
  return (
    <div className={styles.input}>
      {icon === "user" ? (
        <BiUser />
      ) : icon === "email" ? (
        <siMinutemailer />
      ) : icon === "password" ? (
        <IoKeyOutline />
      ) : (
        ""
      )}
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default LoginInput;
