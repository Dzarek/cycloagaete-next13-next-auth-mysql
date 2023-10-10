import styled from "styled-components";
import { MdLocationOn, MdDirectionsBike } from "react-icons/md";
import { FiMap } from "react-icons/fi";
import Link from "next/link";

const shortRoadsImg = "/images/homepage/shortRoads.png";

const ShortRoads = () => {
  return (
    <Wrapper className="mainPage">
      <div className="title">
        <h2>Zastanawiasz się gdzie pojechać?</h2>
      </div>
      <MdDirectionsBike className="bike svg" />
      <MdLocationOn className="marker svg" />
      <img src={shortRoadsImg} alt="mapa" />
      <Link href="/roads" className="linkToRoads">
        Zobacz nasze proponowane trasy!
        <FiMap className="map" />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--secondaryColor3);
  background: #333;
  padding-top: 7vh;
  @media screen and (max-width: 800px) {
    min-height: 70vh;
  }
  .title {
    display: block;
    margin-left: 5vw;
    @media screen and (max-width: 800px) {
      margin: 0 auto;
      width: 90vw;
    }
    h2 {
      color: white;
    }
  }
  .svg {
    color: var(--secondaryColor);
  }
  .bike {
    position: absolute;
    top: 57%;
    left: 12.5%;
    font-size: 5rem;
    @media screen and (max-width: 800px) {
      font-size: 3rem;
      top: 47%;
      left: 3%;
      display: none;
    }
  }
  .marker {
    position: absolute;
    top: 28%;
    right: 24%;
    animation: markerSizer 2s infinite alternate;
    font-size: 7rem;
    @media screen and (max-width: 800px) {
      font-size: 4rem;
      top: 28%;
      right: 12%;
      display: none;
    }
  }
  @keyframes markerSizer {
    0% {
      transform: scale(1.4);
    }
    60% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
  img {
    width: 85vw;
    height: 60vh;
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translateX(-50%);
    @media screen and (max-width: 800px) {
      width: 100vw;
      left: 0%;
      transform: translateX(0%);
      height: 50vh;
      bottom: 0%;
    }
  }
  .linkToRoads {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    cursor: pointer;
    font-family: var(--headerFont);
    text-decoration: none;
    font-size: 1.8rem;
    font-weight: 600;
    svg {
      color: var(--secondaryColor);
      font-size: 3rem;
      margin-top: 2vh;
      transition: 0.3s;
    }
    :hover svg {
      font-size: 4rem;
    }
    @media screen and (max-width: 800px) {
      top: 53%;
      /* flex-direction: row; */
      width: 70%;
      justify-content: space-between;
      h3 {
        font-size: 1.4rem;
        /* width: 70%; */
        text-align: center;
      }
      svg {
        font-size: 3rem;
        margin-top: 5vh;
      }
      :hover svg {
        font-size: 3rem;
      }
    }
  }
`;

export default ShortRoads;
