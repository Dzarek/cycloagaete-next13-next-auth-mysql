import styled from "styled-components";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Link from "next/link";
import { bikesArray } from "../../public/data";
import OneBike from "../OneBike";

const ShortBikes = () => {
  return (
    <Wrapper className="mainPage">
      <div className="title">
        <h2>Nasze Rowery</h2>
      </div>
      <Carousel
        className="carousel"
        infinite
        autoPlay={5000}
        animationSpeed={1000}
        slidesPerPage={1}
        breakpoints={{
          900: {
            slidesPerPage: 1,
          },
        }}
        addArrowClickHandler
        stopAutoPlayOnHover
        draggable={false}
        arrowLeft={
          <div>
            <MdOutlineArrowBackIos className="arrow" />
            <MdOutlineArrowBackIos className="arrow arrowBottom" />
          </div>
        }
        arrowRight={
          <div>
            <MdOutlineArrowForwardIos className="arrow arrowRight" />
            <MdOutlineArrowForwardIos className="arrow arrowRight arrowBottom" />
          </div>
        }
      >
        {bikesArray.map((item, index) => {
          return (
            <div className="oneBike" key={index}>
              <OneBike item={item} />
            </div>
          );
        })}
      </Carousel>
      <Link href="/bikes">
        <p className="linkToBikes">Zobacz wszystkie</p>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 5vh;
  padding-top: 7vh;
  .title h2 {
    color: #444;
  }
  .carousel {
    width: 80vw;
    margin: 7vh auto 3vh;
    height: 70vh;
    @media screen and (min-height: 800px) {
      height: 55vh;
    }
    @media screen and (max-width: 800px) {
      width: 100vw;
      height: auto;
      position: relative;
      padding: 5vh 0 12vh;
    }
  }
  .arrow {
    font-size: 2rem;
    cursor: pointer;
    transition: 0.4s;
    :hover {
      color: var(--secondaryColor);
    }
  }
  .arrowBottom {
    display: none;
  }
  @media screen and (max-width: 800px) {
    .arrow {
      font-size: 2rem;
      position: absolute;
      top: 0vh;
      left: 50%;
      transform: translateX(-100%);
      width: 30vw;
    }
    .arrowRight {
      transform: translateX(0%);
    }
    .arrowBottom {
      top: 96%;
      display: block;
    }
  }
  .linkToBikes {
    margin: 2vh auto;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 2rem;
    color: var(--secondaryColor3);
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    border: 2px solid white;
    transition: 0.5s;
    width: 40vw;
    padding: 5px;
    border-radius: 5px;
    font-family: var(--headerFont);
    letter-spacing: 3px;
    text-align: center;
    :hover {
      border: 2px solid var(--secondaryColor);
      color: var(--secondaryColor);
    }
    @media screen and (max-width: 800px) {
      border: 2px solid var(--secondaryColor);
      width: 80vw;
      font-size: 1.5rem;
    }
  }
  .oneBike {
    width: 85%;
    @media screen and (max-width: 800px) {
      width: 100%;
      margin-top: 3vh;
    }
  }
`;

export default ShortBikes;
