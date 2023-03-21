import Header from "./Header";
import Menu from "./Menu";
import Offers from "./offers";
import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import User from "./User";
const HomeMain = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
};

export default HomeMain;
