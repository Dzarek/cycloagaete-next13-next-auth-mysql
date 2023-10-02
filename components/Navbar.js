import { useEffect, useState } from "react";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useGlobalContext } from "./context";

import { HiArrowCircleUp, HiHome, HiExclamation, HiMail } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";
import {
  FaRegArrowAltCircleUp,
  FaImages,
  FaQuestion,
  FaLockOpen,
} from "react-icons/fa";
import { TbBike } from "react-icons/tb";
import { FiMap } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";

import { useSession } from "next-auth/react";

const logo = "/images/homepage/headerImg.png";
const cycloagaeteH1 = "/images/homepage/cycloagaeteH1.png";
const headerBg = "/images/homepage/navBg.jpg";
const polandFlag = "/images/poland-flag.png";
const englandFlag = "/images/england-flag.png";

const Navbar = () => {
  const { status } = useSession();
  const { plLanguage, setPlLanguage } = useGlobalContext();

  const [offset, setOffset] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <>
      <Wrapper>
        <div
          className={
            (offset > windowHeight && router.pathname == "/") ||
            router.pathname !== "/"
              ? "navbar"
              : "navbar none"
          }
        >
          <Link href="/reservation" legacyBehavior>
            <a
              className={
                router.pathname == "/reservation"
                  ? "bookingLink activeLink"
                  : "bookingLink"
              }
            >
              {plLanguage ? "Rezerwacja" : "reservation"}
            </a>
          </Link>
          <img src={logo} alt="logo" className="logo" />
          <Link href="/" legacyBehavior>
            <a className={router.pathname == "/" ? "active" : ""}>
              {plLanguage ? "strona główna" : "home page"}
            </a>
          </Link>
          <Link href="/bikes" legacyBehavior>
            <a className={router.pathname == "/bikes" ? "active" : ""}>
              {plLanguage ? "rowery" : "bikes"}
            </a>
          </Link>
          <Link href="/roads" legacyBehavior>
            <a className={router.pathname == "/roads" ? "active" : ""}>
              {plLanguage ? "polecane trasy" : "favorite roads"}
            </a>
          </Link>
          <Link href="/gallery" legacyBehavior>
            <a className={router.pathname == "/gallery" ? "active" : ""}>
              {plLanguage ? "galeria" : "gallery"}
            </a>
          </Link>
          <Link href="/faq" legacyBehavior>
            <a className={router.pathname == "/faq" ? "active" : ""}>FAQ</a>
          </Link>
          <Link href="/regulations" legacyBehavior>
            <a className={router.pathname == "/regulations" ? "active" : ""}>
              {plLanguage ? "regulamin" : "regulations"}
            </a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className={router.pathname == "/contact" ? "active" : ""}>
              {plLanguage ? "kontakt" : "contact"}
            </a>
          </Link>
          <div className="languages">
            <img
              src={polandFlag}
              alt="flaga polska"
              onClick={() => setPlLanguage(true)}
              className={plLanguage ? "activeFlag" : ""}
            />
            <img
              src={englandFlag}
              alt="flaga angielska"
              onClick={() => setPlLanguage(false)}
              className={!plLanguage ? "activeFlag" : ""}
            />
            {status === "authenticated" ? (
              <Link href="/protected">
                <FaLockOpen className="adminLogin" />{" "}
              </Link>
            ) : (
              <MdAdminPanelSettings
                className="adminLogin"
                onClick={() => {
                  signIn();
                }}
              />
            )}
          </div>
        </div>
        <button
          className={offset > 200 ? "upBtn" : "upBtn upBtnNone"}
          onClick={() => {
            scroll.scrollToTop();
          }}
        >
          <HiArrowCircleUp />
        </button>
      </Wrapper>
      <Wrapper2>
        {!showMenu && (
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={
              (offset > windowHeight && router.pathname == "/") ||
              router.pathname !== "/"
                ? "navHamburger black"
                : "navHamburger"
            }
          >
            <CgMenuGridR />
          </button>
        )}
        <div className={showMenu ? "navbar" : "navbar none"}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="navHamburger2"
          >
            <FaRegArrowAltCircleUp />
          </button>
          <img src={logo} alt="logo" className="logo" />
          <img src={cycloagaeteH1} alt="logo" className="logo2" />

          <Link href="/" legacyBehavior>
            <a
              className={router.pathname == "/" ? "active" : ""}
              onClick={() => setShowMenu(false)}
            >
              <HiHome />
              {plLanguage ? "strona główna" : "home page"}
            </a>
          </Link>
          <Link href="/bikes" legacyBehavior>
            <a
              className={router.pathname == "/bikes" ? "active" : ""}
              onClick={() => setShowMenu(false)}
            >
              <TbBike />
              {plLanguage ? "rowery" : "bikes"}
            </a>
          </Link>
          <Link href="/roads" legacyBehavior>
            <a
              className={router.pathname == "/roads" ? "active" : ""}
              onClick={() => setShowMenu(false)}
            >
              <FiMap />
              {plLanguage ? "polecane trasy" : "favorite roads"}
            </a>
          </Link>
          <Link href="/gallery" legacyBehavior>
            <a
              className={router.pathname == "/gallery" ? "active" : ""}
              onClick={() => setShowMenu(false)}
            >
              <FaImages />
              {plLanguage ? "galeria" : "gallery"}
            </a>
          </Link>
          <Link href="/faq" legacyBehavior>
            <a
              className={router.pathname == "/faq" ? "active" : ""}
              onClick={() => setShowMenu(false)}
            >
              <FaQuestion />
              FAQ
            </a>
          </Link>
          <Link href="/regulations" legacyBehavior>
            <a
              className={router.pathname == "/regulations" ? "active" : ""}
              onClick={() => setShowMenu(false)}
            >
              <HiExclamation />
              {plLanguage ? "regulamin" : "regulations"}
            </a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a
              className={router.pathname == "/contact" ? "active" : ""}
              onClick={() => setShowMenu(false)}
            >
              <HiMail />
              {plLanguage ? "kontakt" : "contact"}
            </a>
          </Link>
          <Link href="/reservation" legacyBehavior>
            <a
              className={
                router.pathname == "/reservation"
                  ? "bookingLink activeLink"
                  : "bookingLink"
              }
              onClick={() => setShowMenu(false)}
            >
              {plLanguage ? "Rezerwacja" : "reservation"}
            </a>
          </Link>
          <div className="languages">
            <img
              src={polandFlag}
              alt="flaga polska"
              onClick={() => setPlLanguage(true)}
              className={plLanguage ? "activeFlag" : ""}
            />
            <img
              src={englandFlag}
              alt="flaga angielska"
              onClick={() => setPlLanguage(false)}
              className={!plLanguage ? "activeFlag" : ""}
            />
          </div>
        </div>
        <button
          className={offset > 200 ? "upBtn" : "upBtn upBtnNone"}
          onClick={() => {
            scroll.scrollToTop();
          }}
        >
          <HiArrowCircleUp />
        </button>
      </Wrapper2>
    </>
  );
};

const Wrapper = styled.div`
  @media screen and (max-width: 800px) {
    display: none;
  }

  .navbar {
    position: fixed;
    height: 10vh;
    width: 90vw;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 5vw 0 5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9999;
    /* background: #111; */
    transition: 1s;
    border-radius: 0 0 50px 50px;
    background-image: url(${headerBg});
    background-size: cover;
    background-position: center 20%;
    h5,
    a {
      font-weight: 600;
      /* height: 100%; */
      display: flex;
      align-items: center;
      font-size: 1.3rem;
      font-family: var(--headerFont);
      text-transform: uppercase;
      transition: 0.4s;
      cursor: pointer;
      text-decoration: none;
      color: white;
      &.active {
        color: var(--secondaryColor);
      }
      :hover {
        color: var(--secondaryColor3);
      }
    }
    .bookingLink {
      background: var(--secondaryColor3);
      padding: 5px 15px;
      border-radius: 5px;
      :hover {
        background: white;
      }
    }

    .logo {
      /* margin-right: 3vw; */
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
    }
  }
  .none {
    transition: 1s;
    transform: translateY(-15vh) translateX(-50%);
  }
  .languages {
    border-left: 2px solid var(--secondaryColor);
    display: flex;
    padding-left: 20px;
    img {
      width: 30px;
      margin: 0 10px;
      filter: saturate(0);
      transition: 0.4s;
      cursor: pointer;
      :hover {
        filter: saturate(0.9);
      }
    }
    .activeFlag {
      filter: saturate(0.7);
    }
  }

  .upBtn {
    position: fixed;
    bottom: 3vh;
    right: 3vw;
    font-size: 2rem;
    background: transparent;
    border: none;
    color: var(--secondaryColor);
    transition: 0.5s;
    cursor: pointer;
    z-index: 9999;
    :hover {
      color: var(--secondaryColor3);
    }
  }
  .upBtnNone {
    opacity: 0;
  }
`;
const Wrapper2 = styled.div`
  @media screen and (min-width: 801px) {
    display: none;
  }
  .black {
    background: #111;
  }
  .navbar {
    position: fixed;
    height: 100vh;
    height: 100dvh;
    width: 100vw;
    top: 0;
    left: 0;
    padding: 28vh 1vw 30vh;
    padding: 28dvh 1vw 30dvh;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    z-index: 99999;
    background: #111;
    transition: 1s;
    /* background-image: url(${headerBg}); */
    background-size: cover;
    background-position: center;
    h5,
    a {
      width: 30%;
      margin: 2vh auto 2vh;
      margin: 2dvh auto 2dvh;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      font-family: var(--headerFont);
      text-transform: uppercase;
      transition: 0.4s;
      cursor: pointer;
      text-decoration: none;
      color: #bbb;
      svg {
        font-size: 2.3rem;
        margin-bottom: 2vh;
        margin-bottom: 2dvh;
        color: #fff;
      }
      &.active {
        color: var(--secondaryColor);
        svg {
          color: var(--secondaryColor);
        }
      }
      :nth-of-type(1) {
        width: 90%;
      }
    }
    .bookingLink {
      min-width: 50%;
      font-weight: 500;
      margin-top: 5vh;
      margin-top: 5dvh;
      font-size: 1.2rem;
      background: var(--secondaryColor3);
      padding: 8px 10px;
      border-radius: 5px;
      color: #fff;
    }

    .logo {
      width: 25%;
      position: absolute;
      top: 3vh;
      top: 3dvh;
      left: 50%;
      transform: translateX(-50%);
    }
    .logo2 {
      width: 50%;
      position: absolute;
      top: 20vh;
      top: 20dvh;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .none {
    transition: 1s;
    transform: translateY(-115vh);
    transform: translateY(-115dvh);
  }
  .languages {
    position: absolute;
    bottom: 2vh;
    /* left: 50%;
    transform: translateX(-50%); */
    right: 2vw;
    display: flex;
    img {
      width: 35px;
      margin: 0 10px;
      filter: saturate(0);
      transition: 0.4s;
      cursor: pointer;
    }
    .activeFlag {
      filter: saturate(0.5);
    }
  }
  .upBtn {
    position: fixed;
    bottom: 3vh;
    bottom: 3dvh;
    right: 3vw;
    font-size: 2rem;
    background: transparent;
    border: none;
    color: var(--secondaryColor3);
    transition: 0.5s;
    cursor: pointer;
    z-index: 9999;
    :hover {
      color: var(--secondaryColor3);
    }
  }
  .upBtnNone {
    opacity: 0;
  }
`;

export default Navbar;
