import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./styles.module.scss";
const CircleIconButton = ({ type, text, icon }) => {
  return (
    <>
      <button className={styles.button} type={type}>
        {text}
        <div className={styles.svg__wrap}>
          <BiRightArrowAlt />
        </div>
      </button>
    </>
  );
};

export default CircleIconButton;
