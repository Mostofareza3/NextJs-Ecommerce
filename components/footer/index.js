import Links from "./Links";
import styles from "./styles.module.scss";
import Socials from "./Socials";
import NewsLetter from "./NewLetter";
import Copyright from "./Copyright";
import Payment from "./Payment";

const Footer = ({ country }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <NewsLetter />
        <Copyright country={country} />
        <Payment />
      </div>
    </footer>
  );
};

export default Footer;
