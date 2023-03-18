import React from "react";
import styles from "./styles.module.scss";
import { DotLoader as DLoader } from "react-spinners";

const DotLoader = ({ loading }) => {
  return (
    <div className={styles.loader}>
      <DLoader color="#2f82ff" loading={loading} size={50} />
    </div>
  );
};

export default DotLoader;
