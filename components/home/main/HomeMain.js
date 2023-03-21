import Menu from "./Menu";
import Offers from "./offers";
import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
const HomeMain = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <Menu />
      <MainSwiper />
      <Offers />
      <div className={styles.user}>user</div>
    </div>
  );
};

export default HomeMain;
