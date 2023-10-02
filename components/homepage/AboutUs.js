import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import { RiTruckLine, RiTimeLine, RiTeamLine } from "react-icons/ri";

const firstInfoImg = "/images/homepage/firstInfoImg.png";

const AboutUs = ({ dataOnas }) => {
  useEffect(() => {
    Aos.init({ duration: 1000, disable: "false" });
  }, []);
  return (
    <Wrapper>
      <section>
        <h2>O nas</h2>
        <p>{dataOnas}</p>
        <div className="iconContent">
          <div className="onePart">
            <RiTruckLine />
            <h4>
              7 dni w górę - dostawa gratis <br /> na terenie całej wyspy
            </h4>
          </div>
          <div className="onePart">
            <RiTimeLine />
            <h4>
              Czynne 24h na dobę/ <br /> 7 dni w tygodniu
            </h4>
          </div>
          <div className="onePart">
            <RiTeamLine />
            <h4>
              Domowa atmosfera <br /> kolarskiej rodziny
            </h4>
          </div>
        </div>
      </section>
      <img src={firstInfoImg} alt="" data-aos="fade-left" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  margin: 5vh auto;
  padding: 0vh 10vw 10vh;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    padding: 0vh 10vw 0vh;
  }
  section {
    width: 50vw;
    text-align: left;
    h2 {
      margin-bottom: 5vh;
      color: var(--secondaryColor);
      text-transform: uppercase;
      font-size: 3rem;
      letter-spacing: 5px;
      font-family: var(--headerFont);
    }
    p {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.5;
    }
    .iconContent {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 7vh;
      .onePart {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;
        svg {
          color: var(--secondaryColor);
          margin-bottom: 2vh;
          font-size: 3rem;
          transition: 0.4s;
        }
        h4 {
          text-align: center;
          font-size: 1.4rem;
          font-weight: 500;
          font-family: var(--headerFont);
        }
        :hover svg {
          transform: scale(1.2);
        }
      }
    }
    @media screen and (max-width: 800px) {
      width: 100vw;
      text-align: center;
      h2 {
        margin-bottom: 3vh;
        margin-top: 5vh;
        font-size: 2rem;
        letter-spacing: 3px;
      }
      p {
        font-size: 1.1rem;
        width: 90%;
        margin: 0 auto;
      }
      .iconContent {
        width: 100%;
        margin: 5vh auto;
        flex-wrap: wrap;
        justify-content: center;
        .onePart {
          width: 45%;
          margin-bottom: 3vh;
          svg {
            font-size: 3rem;
          }
          h4 {
            font-size: 1.1rem;
          }
          :hover svg {
            transform: scale(1);
          }
          :nth-child(1) {
            order: 3;
          }
        }
      }
    }
  }
  img {
    width: 25vw;
    @media screen and (max-width: 800px) {
      order: 1;
      display: none;
    }
  }
`;

export default AboutUs;
