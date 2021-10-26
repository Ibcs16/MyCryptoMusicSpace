import * as React from "react";
import { ethers } from "ethers";

import MusicPlayer from "./MusicPlayer";
import Recommendations from "./Recommendations";
import Button from "./Button";
import Loading from "./Loading";

import { CONTRACT, contractABI } from "../../utils/constants";
import Modal from "./Modal";

const SONG_COVER =
  "https://upload.wikimedia.org/wikipedia/pt/3/39/The_Weeknd_-_Starboy.png";
const SONG_TITLE = "I feel it coming";

export default function Home() {
  const [currentAddress, setCurrentAddress] = React.useState(null);
  const [recommendations, setRecommendations] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const getEthereum = React.useCallback(({ showAlert = false } = {}) => {
    const { ethereum } = window;
    if (!ethereum) {
      if (showAlert) {
        alert("Get Metamask");
      }
      throw Error("Install metamask");
    }

    console.info("Metamask installed");
    return ethereum;
  }, []);

  const checkIfWalletIsConnected = React.useCallback(async () => {
    try {
      const ethereum = getEthereum();

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        const account = accounts[0];
        console.info("Found authorized account: ", account);
        setCurrentAddress(account);
      } else {
        console.warn("No authorized account found");
      }
    } catch (error) {
      console.error(error);
    }
  }, [getEthereum]);

  const getContract = React.useCallback(async () => {
    const ethereum = getEthereum();

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const myCryptoMusicSpace = new ethers.Contract(
      CONTRACT,
      contractABI,
      signer
    );

    return myCryptoMusicSpace;
  }, [getEthereum]);

  const getAllRecommendations = React.useCallback(async () => {
    try {
      setLoading(true);
      const myCryptoMusicSpace = await getContract();

      const allRecommendations =
        await myCryptoMusicSpace.getAllRecommendations();
      const formattedRecommendations = allRecommendations.map(
        ({ from: address, song, timestamp }) => ({
          address,
          song,
          date: new Date(timestamp * 1000).toISOString().split("T")[0],
        })
      );

      console.log("found", allRecommendations);
      setRecommendations(formattedRecommendations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const ethereum = getEthereum({ showAlert: true });

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAddress(accounts[0]);
      getAllRecommendations();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const recommendSong = async (new_song = "") => {
    try {
      console.log("Should recommend: ", new_song);
      setLoading(true);
      const myCryptoMusicSpace = await getContract();
      setShowModal(false);

      let count = await myCryptoMusicSpace.getTotalRecommendedSongs();
      console.log("%s recommended songs", count.toNumber());

      const recommendSongTxn = await myCryptoMusicSpace.recommendSong(
        new_song,
        { gasLimit: 300000 }
      );
      console.log("Mining...", recommendSongTxn.hash);

      await recommendSongTxn.wait();
      console.log("Mined -- ", recommendSongTxn.hash);

      count = await myCryptoMusicSpace.getTotalRecommendedSongs();
      console.log("%s recommended songs", count.toNumber());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const onNewSongRecommendation = (from, timestamp, song) => {
      console.log("NewSongRecommendation", from, timestamp, song);
      console.log(from, timestamp, song);
      setRecommendations((prevState) => [
        ...prevState,
        {
          address: from,
          date: new Date(timestamp * 1000).toISOString(),
          song: song,
        },
      ]);
    };

    let myCryptoMusicSpace;

    (async () => {
      myCryptoMusicSpace = await getContract();
      myCryptoMusicSpace.on("NewSongRecommendation", onNewSongRecommendation);
    })();

    return () => {
      if (myCryptoMusicSpace) {
        myCryptoMusicSpace.off(
          "NewSongRecommendation",
          onNewSongRecommendation
        );
      }
    };
  }, [setRecommendations, getContract]);

  React.useEffect(() => {
    checkIfWalletIsConnected();
    getAllRecommendations();
  }, [checkIfWalletIsConnected, getAllRecommendations]);

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="info">
            <h1 className="title">
              <p>Hi,</p>
              <p>
                {"I'm"}, <span className="name hologram">@iago_brayham</span>
              </p>
            </h1>

            <p className="bio">
              web3 programmer and music lover. Share your fav songs + new music
              findings with me! Or follow me at{" "}
              <a
                target="_blank"
                href="https://audius.co/ibrayham"
                rel="noreferrer"
              >
                audius.co
              </a>
            </p>
          </div>
          <MusicPlayer songCover={SONG_COVER} songTitle={SONG_TITLE} />
        </div>

        <Recommendations recommendations={recommendations} />

        {loading && <Loading />}

        {!loading && (
          <Button
            isActive={!currentAddress}
            label={currentAddress ? "Recommend Song" : "Connect wallet"}
            onClick={currentAddress ? () => setShowModal(true) : connectWallet}
          />
        )}
      </div>

      {
        <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(new_song) => recommendSong(new_song)}
        />
      }
    </>
  );
}
