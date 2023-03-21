import styles from "./styles.module.scss";
const HomeMain = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>menu</div>
      <div className={styles.swiper}>swiper</div>
      <div className={styles.offers}>offer</div>
      <div className={styles.user}>user</div>
    </div>
  );
};

export default HomeMain;
