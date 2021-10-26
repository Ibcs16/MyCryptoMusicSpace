import Head from "next/head";

import styles from "../styles/Home.module.css";
import App from "./components/Home";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Crypto Music Space</title>
        <meta
          name="description"
          content="I love new songs. Please, recommend me one you like, and get a chance to win some faucet ETH!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <App />
      </main>
    </div>
  );
}
