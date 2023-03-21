import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.scss";
import Header from "./../../components/header/index";
import Footer from "./../../components/footer/index";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import HomeMain from "components/home/main/HomeMain";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  const { data: session } = useSession();

  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <HomeMain />
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  let data = await axios
    .get("https://api.ipregistry.co/?key=ngvkz8agobfydhav")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => console.log(err));
  return {
    props: {
      country: {
        name: data?.name || "Bangladesh",
        flag: data?.flag?.emojitwo || "🇧🇩",
      },
    },
  };

  // console.log(data);
}
