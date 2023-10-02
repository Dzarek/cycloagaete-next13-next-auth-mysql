import styled from "styled-components";
import { IoClose, IoTimeOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { useState } from "react";
import { roadsArray } from "../public/data";

const OneRoad = ({ activeRoad, setActiveRoad }) => {
  const [controlMap, setControlMap] = useState(false);

  const { id, image, name, distance, time, info, navigation } = activeRoad;
  const selectedRoad = roadsArray.find((item) => item.id === id);
  const mapLink = selectedRoad.linkToMap;
  return (
    <Wrapper>
      <IoClose onClick={() => setActiveRoad(false)} className="closeIcon" />
      <div className="contentArticle">
        <img src={image} alt="" />
        <h3>{name}</h3>
        <section>
          <span>
            <GiPathDistance /> {distance} km
          </span>
          <span>
            <IoTimeOutline /> {time} h
          </span>
        </section>
        <div className="map">
          <div className={controlMap ? "overlayExtra" : "overlay"}></div>
          <iframe
            src={mapLink}
            title="mapa"
            allowfullscreen=""
            loading="lazy"
            height="400"
            width="100%"
          ></iframe>
          {!controlMap ? (
            <button
              className="mapButton navButton"
              onClick={() => setControlMap(true)}
            >
              włącz mapę
            </button>
          ) : (
            <button
              className="mapButton navButton"
              onClick={() => setControlMap(false)}
            >
              wyłącz mapę
            </button>
          )}
        </div>
        <a href={navigation}>
          <FaLocationArrow className="mapIcon" />
          Rozpocznij
        </a>
        <p>{info}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.9);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  @media screen and (max-width: 800px) {
    background: rgba(0, 0, 0, 0.95);
  }
  .closeIcon {
    position: absolute;
    top: 3vh;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4rem;
    color: #eee;
    cursor: pointer;
    transition: 0.4s;
    @media screen and (max-width: 800px) {
      top: 5vh;
    }
    :hover {
      color: var(--secondaryColor);
      transform: translateX(-50%) rotate(180deg);
    }
  }
  .contentArticle {
    background-color: #eee;
    width: 50vw;
    height: 80vh;
    position: relative;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
    border-radius: 5px;
    border: 2px solid var(--secondaryColor2);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #222;
    @media screen and (max-width: 800px) {
      width: 100vw;
      top: 100%;
      transform: translate(-50%, -100%);
    }
    img {
      width: 100%;
      height: 50vh;
      object-fit: cover;
    }
    .map {
      width: 90%;
      margin: 5vh auto;
      position: relative;
      @media screen and (max-width: 800px) {
        width: 100%;
        margin: 0vh auto 5vh;
      }
      iframe {
        border: 2px solid var(--secondaryColor);
      }
      .overlay {
        position: absolute;
        width: 100%;
        height: 400px;
        top: 0;
        left: 0;
        z-index: 1;
        /* @media screen and (max-width: 800px) {
          display: none;
        } */
      }
      .overlayExtra {
        z-index: -1;
        /* @media screen and (max-width: 800px) {
          display: none;
        } */
      }
      .mapButton {
        position: absolute;
        top: 5%;
        left: 2%;
        z-index: 9;
        background: var(--secondaryColor3);
        padding: 10px;
        border: 2px solid white;
        border-radius: 5px;
        color: white;
        font-family: var(--headerFont);
        font-size: 1.3rem;
        text-transform: uppercase;
        font-weight: 500;
        cursor: pointer;
        transition: 0.4s;
        :hover {
          background: white;
          border: 2px solid var(--secondaryColor3);
          color: var(--secondaryColor3);
        }
        /* @media screen and (max-width: 800px) {
          display: none;
        } */
      }
    }
    a {
      text-decoration: none;
      color: white;
      margin: 3vh auto 5vh;
      transition: 0.4s;
      display: flex;
      align-items: center;
      font-size: 1.7rem;
      padding: 10px 20px;
      background: var(--secondaryColor3);
      border-radius: 5px;
      font-family: var(--headerFont);
      :hover {
        transform: scale(1.1);
      }
      .mapIcon {
        font-size: 1.5rem;
        margin-right: 10px;
      }
    }
    section {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background: #fff;
      width: 100%;
      @media screen and (max-width: 800px) {
        justify-content: space-around;
      }
      span {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 2rem;
        margin: 3vh 5vw;
        @media screen and (max-width: 800px) {
          font-size: 1.5rem;
          margin: 3vh auto;
        }
        svg {
          color: var(--secondaryColor3);
          font-size: 3rem;
          margin-right: 10px;
          @media screen and (max-width: 800px) {
            font-size: 2.5rem;
            margin-right: 10px;
          }
        }
      }
    }
    h3 {
      margin: 0vh auto;
      text-transform: uppercase;
      font-size: 1.8rem;
      color: var(--secondaryColor2);
      padding: 3vh 3vw;
      font-family: var(--headerContactFont);
      text-align: center;
      background: #fff;
      width: 100%;
    }
    p {
      padding: 0 3vw;
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 20px;
      @media screen and (max-width: 800px) {
        padding: 0 4vw;
      }
    }
  }
`;

export default OneRoad;
