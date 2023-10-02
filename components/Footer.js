import styled from "styled-components";

import {
  MdPhoneAndroid,
  MdEmail,
  MdFacebook,
  MdLocationOn,
  MdAccessTimeFilled,
} from "react-icons/md";

const logoJarek = "/images/logoJarek.png";
const logo = "/images/homepage/headerImg.png";

const Footer = () => {
  return (
    <Wrapper>
      <div className="content">
        <div className="bankDetails">
          <h3>Godziny pracy biura :</h3>
          <h4>
            <MdAccessTimeFilled />
            8:00-16:00
          </h4>
          <p className="cytat">
            Życie jest jak jazda na rowerze. <br /> Żeby utrzymać równowagę
            musisz się poruszać naprzód. <br /> - Albert Einstein
          </p>
        </div>
        <img src={logo} alt="logo" className="logoFooter" />
        <div className="socialMediaWrapper">
          <h3>Kontakt :</h3>
          <a href="tel:+48798698605">
            <MdPhoneAndroid /> <span>+48 606 475 397</span>
          </a>
          <a href="tel:+34686738919">
            <MdPhoneAndroid /> <span>+34 686 738 919</span>
          </a>
          <a href="mailto:info@cyclotrener.pl">
            <MdEmail /> <span>info@cyclotrener.pl</span>
          </a>
          <a
            href="https://www.facebook.com/Cyclo-Agaete-Bike-Rental-641591279633781/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdFacebook /> <span>Cyclo Agaete Bike Rental</span>
          </a>
          <h4>
            <MdLocationOn />
            <span>
              Calle Maestro Jose Bermudez 5, 1G <br />
              35480 Agaete, Las Palmas de Gran Canaria <br />
              Hiszpania
            </span>
          </h4>
        </div>
      </div>

      <p className="allRights">
        <div className="line"></div>
        &copy; {new Date().getFullYear()} DANIEL PASZEK CYCLO TRENER. Wszelkie
        prawa zastrzeżone.
      </p>
      <span className="logoJarek">
        <p>projekt i wykonanie</p>
        <a href="https://www.jarekjanas.com">
          <img src={logoJarek} alt="logo Jarosław Janas" />
        </a>{" "}
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100vw;
  padding: 5vh 7vw;
  background: #111;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: white;
  @media screen and (max-width: 800px) {
    padding: 5vh 3vw 10vh;
  }
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    position: relative;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
    .logoFooter {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 15vh;
      filter: saturate(0);
      @media screen and (max-width: 800px) {
        position: static;
        transform: translate(0);
        align-self: center;
        margin: 5vh auto;
        order: 1;
      }
    }
    .cytat {
      font-style: italic;
      line-height: 1.5;
      font-size: 1.2rem;
      align-self: center;
      text-align: center;
      font-family: var(--headerFont);
      margin-top: 5vh;
      letter-spacing: 1px;
      @media screen and (max-width: 800px) {
        font-size: 1.1rem;
      }
    }
  }
  .allRights {
    margin-top: 3vh;
    font-family: var(--titleFont);
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    .line {
      width: 70%;
      background: var(--secondaryColor);
      height: 2px;
      margin: 0 auto 2vh;
    }
  }

  .socialMediaWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;

    a,
    h4 {
      font-size: 1.1rem;
      margin-bottom: 1.5vh;
      font-weight: 500;
      text-decoration: none;
      color: white;
      display: flex;
      align-items: center;
      transition: 0.5s;
      font-family: var(--headerFont);
      letter-spacing: 2px;
      align-self: flex-start;
      :hover {
        transform: scale(1.1);
      }
      svg {
        flex-shrink: 0;
        color: var(--secondaryColor);
        margin-right: 10px;
        font-size: 1.5rem;
      }
    }
    @media screen and (max-width: 800px) {
      width: 95%;
      margin: 5vh auto;
      order: 2;
    }
  }
  h3 {
    margin-bottom: 3vh;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-family: var(--titleFont);
    font-weight: 700;
    text-align: center;
  }

  .bankDetails {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35%;
    align-self: center;
    h4 {
      font-size: 1.1rem;
      margin-bottom: 1vh;
      font-weight: 500;
      color: white;
      display: flex;
      align-items: center;
      transition: 0.5s;
      font-family: var(--headerFont);
      letter-spacing: 2px;
      text-align: center;
      align-self: flex-start;
      margin-left: 3vw;
      :nth-of-type(1) {
        align-self: center;
        font-size: 1.3rem;
        margin-left: 0vw;
      }
      :hover {
        transform: scale(1.1);
      }
      span {
        flex-shrink: 0;
        margin-right: 10px;
        font-size: 1.2rem;
        background: var(--secondaryColor);
        width: 50px;
        padding: 2px;
        border-radius: 10px;
        text-align: center;
      }
      svg {
        flex-shrink: 0;
        color: var(--secondaryColor);
        margin-right: 10px;
        font-size: 1.5rem;
      }
    }
    @media screen and (max-width: 800px) {
      width: 95%;
      margin: 5vh auto;
      order: 3;
    }
  }

  .logoJarek {
    position: absolute;
    bottom: 4%;
    left: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    a {
      width: 25px;
      height: 25px;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
        transition: 0.3s;
        opacity: 0.8;
        :hover {
          filter: invert(100%);
        }
      }
    }
    p {
      font-size: 12px;
      letter-spacing: 1px;
    }
    @media screen and (max-width: 800px) {
      bottom: 2%;
      left: 3%;
    }
  }
`;

export default Footer;
