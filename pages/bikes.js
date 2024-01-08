import styled from "styled-components";
import Head from "next/head";
// import { bikesArray } from "../public/data";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BiWinkSmile } from "react-icons/bi";
import OneBike from "../components/OneBike";
import { getData } from "../lib/datamanagmend";

const bikeVideo = "/images/bikes/bikeVideo.mp4";
const headerSVG = "/images/bikes/headerSVG.png";

const Bikes = ({ data_rowery }) => {
  useEffect(() => {
    Aos.init({ duration: 1000, disable: "false" });
  }, []);
  return (
    <>
      <Head>
        <title>Cycloagaete | Rowery</title>
        <meta name="description" content="Cycloagaete - Rowery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="shortcut icon" href="/logo192.png" />
      </Head>
      <Wrapper>
        <header>
          <video
            src={bikeVideo}
            autoPlay
            muted
            loop
            playsInline
            type="video/mp4"
            className="video"
          ></video>
          <img src={headerSVG} alt="" />
          <div className="title">
            <h2>Nasze Rowery</h2>
          </div>
        </header>
        <h3 className="subTitle">
          Poniżej znajdziesz listę naszych rowerów. Wybierz ten, który
          najbardziej Ci odpowiada! <BiWinkSmile />
        </h3>
        <div className="content">
          {data_rowery &&
            data_rowery.rowery.map((item, index) => {
              return (
                <article key={index} data-aos="fade-up">
                  <span>{index + 1}</span>
                  <div className="oneBike">
                    <OneBike item={item} />
                  </div>
                </article>
              );
            })}
        </div>
      </Wrapper>
    </>
  );
};

// aaa

const Wrapper = styled.div`
  width: 100vw;
  min-height: 80vh;
  margin: 0 auto;
  position: relative;
  header {
    width: 100vw;
    height: 50vh;
    position: relative;
    background: var(--bikeVideoBg);
    @media screen and (max-width: 800px) {
      height: 40vh;
    }
    .video {
      position: absolute;
      bottom: 0%;
      left: 0%;
      width: 50%;
      height: 80%;
      object-fit: cover;
      @media screen and (max-width: 800px) {
        height: 110%;
        width: 100%;
      }
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      @media screen and (max-width: 800px) {
        left: 20%;
        display: none;
      }
    }
    .title {
      position: absolute;
      top: 55%;
      left: 70%;
      width: 50%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 800px) {
        top: 88%;
        left: 50%;
        width: 100%;
      }
      h2 {
        color: white;
        @media screen and (max-width: 800px) {
          color: #333;
        }
      }
    }
  }
  .subTitle {
    width: 80vw;
    font-size: 1.5rem;
    margin: 10vh auto;
    text-align: center;
    svg {
      margin-left: 10px;
      margin-bottom: -5px;
      color: var(--secondaryColor3);
      font-size: 1.8rem;
    }
    @media screen and (max-width: 800px) {
      width: 90vw;
      font-size: 1.3rem;
      font-weight: 500;
      margin: 10vh auto 8vh;
      svg {
        font-size: 1.5rem;
        margin-left: 5px;
      }
    }
  }
  .content {
    width: 80vw;
    margin: 10vh auto;
    article {
      width: 100%;
      margin-bottom: 10vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 15rem;
        color: #aaa;
      }
      :nth-child(even) {
        flex-direction: row-reverse;
      }
    }
    @media screen and (max-width: 800px) {
      width: 100vw;
      margin: 8vh auto 20vh;

      article {
        flex-direction: column;
        margin-bottom: 7vh;
        span {
          font-size: 5rem;
          margin-bottom: 2vh;
        }
        :nth-child(even) {
          flex-direction: column;
        }
      }
    }
  }
  .oneBike {
    width: 85%;
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }
`;

export default Bikes;

export const getStaticProps = async () => {
  const data_rowery = await getData("rowery");

  return {
    props: {
      data_rowery: data_rowery,
    },
    revalidate: 60,
  };
};
