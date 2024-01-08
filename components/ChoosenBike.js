import styled from "styled-components";
import { useState } from "react";
import { useGlobalContext } from "./context";
import { MdPedalBike } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { HiArrowCircleRight } from "react-icons/hi";
// import { bikesArray } from "../public/data";
import Link from "next/link";

const ChoosenBike = () => {
  const { choosenBikes, setChoosenBikes } = useGlobalContext();
  const [showBikes, setShowBikes] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  const handleDelete = (item) => {
    const updateBikes = choosenBikes.filter((el) => el.name !== item);
    setChoosenBikes(updateBikes);
    if (updateBikes.length < 1) {
      setShowBikes(false);
    }
  };

  return (
    <>
      {choosenBikes.length > 0 && (
        <Wrapper>
          <div className={showBikes ? "all showAll" : "all"}>
            <div
              className={showBikes ? "iconBike iconBikeHideMobile" : "iconBike"}
            >
              {showBikes ? (
                <HiArrowCircleRight onClick={() => setShowBikes(false)} />
              ) : (
                <MdPedalBike
                  onClick={() => setShowBikes(true)}
                  className="bikeIcon"
                />
              )}
            </div>
            <div
              className={activeImg ? "container borderContainer" : "container"}
            >
              <HiArrowCircleRight
                onClick={() => setShowBikes(false)}
                className="iconBikeMobile"
              />
              <h4>Wybrane rowery:</h4>
              {choosenBikes.length > 0 && (
                <ul>
                  {choosenBikes.map((item, index) => {
                    return (
                      <li key={index}>
                        <MdPedalBike />{" "}
                        <p
                          onMouseOver={() => setActiveImg(item.img)}
                          onMouseLeave={() => setActiveImg(null)}
                        >
                          {item.name}
                        </p>
                        <IoClose onClick={() => handleDelete(item.name)} />
                      </li>
                    );
                  })}
                </ul>
              )}
              <Link href="/reservation" className="buttonLink">
                Rezerwacja
              </Link>
            </div>
          </div>
          {activeImg && (
            <div className="imgContainer">
              <img src={activeImg} alt="" />
            </div>
          )}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 15vh;
  right: 0vw;
  z-index: 999999999;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    top: 10vh;
  }
  .all {
    display: flex;
    align-items: flex-start;
    transform: translateX(40vw);
    transition: 0.5s;
    @media screen and (max-width: 800px) {
      transform: translateX(100vw);
    }
  }
  .showAll {
    transform: translateX(0);
    transition: 0.5s;
  }
  .iconBike {
    padding: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    background: var(--secondaryColorBg);
    border: 2px solid var(--secondaryColor3);
    border-right: 2px solid var(--secondaryColorBg);
    border-radius: 10px 0 0 10px;
    transform: translateX(3px);
    @media screen and (max-width: 800px) {
      padding: 12px;
      height: 8vh;
    }
  }
  .iconBikeHideMobile {
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  svg {
    font-size: 2.5rem;
    color: var(--secondaryColor3);
    @media screen and (max-width: 800px) {
      font-size: 2.2rem;
    }
  }
  .bikeIcon {
    animation: iconSize 1s infinite alternate;
    @keyframes iconSize {
      100% {
        transform: scale(1.1);
      }
    }
  }
  .container {
    padding: 2vh 2vw;
    background: var(--secondaryColorBg);
    width: 40vw;
    border: 2px solid var(--secondaryColor3);
    border-right: none;
    border-radius: 0 0 0 10px;
    @media screen and (max-width: 800px) {
      width: 100vw;
      padding: 6vh 3vw 3vh;
      border-radius: 0 0 0 0;
      border: 2px solid var(--secondaryColor3);
      position: relative;
    }
    .iconBikeMobile {
      display: none;
      @media screen and (max-width: 800px) {
        display: block;
        position: absolute;
        top: 2vh;
        left: 1vw;
        font-size: 2.3rem;
        color: var(--secondaryColor3);
      }
    }
    h4 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 3vh;
      font-family: var(--headerFont);
      text-transform: uppercase;
      font-weight: 600;
    }
    ul {
      list-style: none;
      li {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 1vh;
        @media screen and (max-width: 800px) {
          margin-bottom: 2vh;
        }
        svg {
          color: var(--secondaryColor3);
          margin-right: 10px;
          flex-shrink: 0;
          font-size: 1.4rem;
          :nth-of-type(2) {
            margin-left: 10px;
            font-size: 1.6rem;
            cursor: pointer;
            transition: 0.3s;
            color: var(--deleteColor);
            :hover {
              transform: scale(1.3);
            }
          }
        }
      }
    }
  }
  .borderContainer {
    border-radius: 0 0 0 0;
  }
  .imgContainer {
    width: 40vw;
    height: 0vw;
    align-self: flex-end;
    border: 2px solid var(--secondaryColor3);
    border-top: 2px solid var(--secondaryColorBg);
    border-right: none;
    border-radius: 0 0 0 10px;
    animation: aaa 1s 1 forwards;
    transform: translateY(-2px);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    @keyframes aaa {
      100% {
        height: 15vw;
      }
    }
    @media screen and (max-width: 800px) {
      width: 100vw;
      border-radius: 0 0 0 0;
      border-right: 2px solid var(--secondaryColor3);
      @keyframes aaa {
        100% {
          height: 40vw;
        }
      }
    }
  }
  img {
    height: 90%;
    object-fit: cover;
  }
  .buttonLink {
    font-size: 1.1rem;
    margin: 2vh auto;
    display: block;
    :hover {
      letter-spacing: 2px;
    }
    @media screen and (max-width: 800px) {
      margin: 5vh auto 2vh;
      :hover {
        letter-spacing: 0px;
      }
    }
  }
`;

export default ChoosenBike;
