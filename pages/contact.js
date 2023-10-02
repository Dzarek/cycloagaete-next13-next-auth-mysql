import styled from "styled-components";
import MyForm from "../components/MyForm";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { MdOutlinePhoneAndroid, MdEmail } from "react-icons/md";
import {
  FaFacebookSquare,
  FaMapMarkerAlt,
  FaInstagramSquare,
} from "react-icons/fa";
import Head from "next/head";

// const bgImg = "/images/contact/bg2.jpg";

const KontaktPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, disable: "mobile" });
  }, []);
  return (
    <>
      <Head>
        <title>Cycloagaete | Kontakt</title>
        <meta name="description" content="Cycloagaete - Kontakt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="shortcut icon" href="/logo192.png" />
      </Head>
      <Wrapper>
        <div className="title">
          <div className="titleLine"></div>
          <h2>Kontakt</h2>
          <div className="titleLine"></div>
        </div>
        <div className="contactContainer">
          <section className="contactForm">
            <h3>Formularz kontaktowy</h3>
            <MyForm />
          </section>

          <section className="contactSocialMedia">
            <h3>Kontakt bezpośredni</h3>
            <div className="socialMediaWrapper">
              <article>
                Telefon:{" "}
                <a className="a" href="tel:+48606475397">
                  <span>+48 606 475 397</span>
                </a>{" "}
                ,{" "}
                <a className="a" href="tel:+34686738919">
                  <span>+34 686 738 919</span>
                </a>
              </article>
              <a href="mailto:info@cyclotrener.pl">
                Email: <span>info@cyclotrener.pl</span>
              </a>
              <a
                href="https://www.facebook.com/Cyclo-Agaete-Bike-Rental-641591279633781/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook: <span>Cyclo Agaete Bike Rental</span>
              </a>
              <h4>
                Adres:{" "}
                <span>
                  Calle Maestro Jose Bermudez 5, 1G <br />
                  35480 Agaete, Las Palmas de Gran Canaria, Hiszpania
                </span>
              </h4>
              <h4>
                NIF: <span>Y4457501T</span>
              </h4>
            </div>
            <div className="socialMediaWrapperM">
              <a href="tel:+48606475397">
                <MdOutlinePhoneAndroid />
                <span>+48 606 475 397</span>
              </a>
              <a href="tel:+34686738919">
                <MdOutlinePhoneAndroid />
                <span>+34 686 738 919</span>
              </a>
              <a href="mailto:info@cyclotrener.pl">
                <MdEmail />
                <span>info@cyclotrener.pl</span>
              </a>
              <a
                href="https://www.facebook.com/Cyclo-Agaete-Bike-Rental-641591279633781/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
                <span>Cyclo Agaete Bike Rental</span>
              </a>
              <h4>
                <FaMapMarkerAlt />
                <span>
                  Calle Maestro Jose Bermudez 5, 1G <br />
                  35480 Agaete, Las Palmas de Gran Canaria, Hiszpania
                </span>
              </h4>
              <h4>
                <p>NIF</p>
                <span>Y4457501T</span>
              </h4>
            </div>
            <div className="bankInfo">
              <h3>Dane do przelewu:</h3>
              <h4>
                <span>PLN</span> 46291000060000000003315884
              </h4>
              <h4>
                <span>€</span> ES3101822424140201582352
              </h4>
            </div>
          </section>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4185.385869082698!2d-15.703949287680176!3d28.10152308590123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc408b6ed78d535b%3A0xd8fa937f91bbf379!2sC.%20Jos%C3%A9%20Berm%C3%BAdez%2C%205%2C%2035480%20Agaete%2C%20Las%20Palmas%2C%20Hiszpania!5e0!3m2!1spl!2spl!4v1674217837512!5m2!1spl!2spl"
          className="map"
          title="mapa"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 10vh;
  position: relative;
  @media screen and (max-width: 800px) {
    padding: 0vh 0;
  }
  .title {
    margin: 10vh auto;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
      h2 {
        width: 70vw;
      }
    }
  }

  .contactContainer {
    position: relative;
    width: 90vw;
    margin: 10vh auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    section {
      width: 49%;
    }

    .contactForm,
    .contactSocialMedia {
      h3 {
        /* color: var(--secondaryColor); */
        font-size: 2rem;
        text-align: center;
        font-weight: 500;
        margin-bottom: 5vh;
        @media screen and (max-width: 800px) {
          font-size: 1.8rem;
        }
      }
    }
    @media screen and (max-width: 800px) {
      flex-direction: column;
      margin: 10vh auto 0vh;
      width: 100vw;
      section {
        width: 100%;
      }
      .separateImg {
        display: none;
      }
      .contactSocialMedia {
        margin-top: 10vh;
      }
    }
  }

  .socialMediaWrapper,
  .socialMediaWrapperM {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    align-self: center;
    margin-top: 3vh;
    a,
    h4,
    article {
      font-size: 1.4rem;
      margin: 1vh 5vw;
      font-weight: 600;
      text-decoration: none;

      color: var(--primaryColor);

      @media screen and (max-width: 1700px) {
        font-size: 1.3rem;
      }
      @media screen and (max-width: 800px) {
        margin: 1vh auto;
        width: 90vw;
        font-size: 1.2rem;
      }

      span {
        color: var(--secondaryColor3);
        transition: 0.5s;
        :hover {
          color: var(--secondaryColor);
          letter-spacing: 1px;
        }
      }
    }

    .a {
      margin: 1vh auto;
      span {
        transition: 0.5s;
        :hover {
          color: var(--secondaryColor);
          letter-spacing: 1px;
        }
      }
    }
  }

  .socialMediaWrapper {
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  .socialMediaWrapperM {
    @media screen and (min-width: 801px) {
      display: none;
    }
    align-items: center;
    a,
    h4 {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      :hover {
        transform: none;
      }
      span {
        margin-left: 10px;
        :hover {
          color: var(--secondaryColor3);
          letter-spacing: 0px;
        }
      }
      svg {
        font-size: 1.5rem;
        flex-shrink: 0;
      }
    }
    @media screen and (max-width: 800px) {
      h4:nth-last-of-type(1) {
        p {
          font-size: 1rem;
          background: var(--primaryColor);
          color: white;
          padding: 5px 5px;
          border-radius: 10px;
          text-align: center;
          margin-left: -5px;
        }
      }
    }
  }
  .bankInfo {
    margin-top: 4vh;
    h4 {
      font-size: 1.4rem;
      margin: 2vh 5vw;
      font-weight: 600;
      transition: 0.5s;
      color: var(--secondaryColor3);
      display: flex;
      align-items: center;
      :hover {
        color: var(--secondaryColor);
        letter-spacing: 1px;
      }
      @media screen and (max-width: 800px) {
        margin: 1vh auto 2vh;
        width: 95vw;
        font-size: 1.2rem;
        text-align: center;
        :hover {
          color: var(--secondaryColor3);
          letter-spacing: 0px;
        }
      }
      span {
        margin-right: 10px;
        font-size: 1.2rem;
        background: var(--primaryColor);
        color: white;
        width: 60px;
        padding: 2px;
        border-radius: 10px;
        text-align: center;
        @media screen and (max-width: 800px) {
          width: 50px;
          padding: 5px;
          font-size: 1rem;
        }
      }
    }
    .bankInfoName {
      font-weight: 600;
      @media screen and (max-width: 800px) {
        text-align: center;
      }
    }
  }
  .map {
    width: 100%;
    height: 50vh;
    margin-top: 5vh;
    margin-bottom: -5px;
    filter: sepia(0.2) saturate(0.5);
    transition: 0.5s;
    border: none;
    border-top: 2px solid var(--secondaryColor);
    :hover {
      filter: sepia(0) saturate(0.9);
    }
    @media screen and (max-width: 800px) {
      width: 100%;
      margin-top: 10vh;
      border-radius: 0px;
    }
  }
`;

export default KontaktPage;
