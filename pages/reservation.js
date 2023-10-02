import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../components/context";
import emailjs from "emailjs-com";
import { bikesArray } from "../public/data";
import OneBike from "../components/OneBike";
import RodoCookies from "../components/RodoCookies";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import { GiReceiveMoney } from "react-icons/gi";
import { MdPedalBike } from "react-icons/md";
import { TbArrowBack } from "react-icons/tb";
import { FaSmileWink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

let minDate = new Date().toISOString().slice(0, 10);

const Reservation = () => {
  const { choosenBikes, setChoosenBikes } = useGlobalContext();

  const [visibleCookie, setVisibleCookie] = useState(false);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [regulationBox, setRegulationBox] = useState(false);
  const [policyBox, setPolicyBox] = useState(false);
  const [withCoachBox, setWithCoachBox] = useState(false);
  const [dateStart, setDateStart] = useState(minDate);
  const [dateEnd, setDateEnd] = useState(dateStart);
  const [daysNumber, setDaysNumber] = useState(1);
  const [pedal, setPedal] = useState("własne");
  const [helmet, setHelmet] = useState("własny");

  useEffect(() => {
    Aos.init({ duration: 1000, disable: "mobile" });
  }, []);

  // USTAWIENIE DATY
  let nextDay = new Date(new Date(dateStart));
  nextDay.setDate(nextDay.getDate() + 1);
  const minDate2 = nextDay.toISOString().slice(0, 10);

  useEffect(() => {
    setDateEnd(nextDay.toISOString().slice(0, 10));
  }, [dateStart]);

  useEffect(() => {
    setDaysNumber(new Date(dateEnd).getDate() - new Date(dateStart).getDate());
  }, [dateStart, dateEnd]);

  // TABLICE DODATKÓW
  const pedals = [
    "własne",
    "Shimano spd sl",
    "Shimano spd",
    "Crank Brothers",
    "Look",
  ].map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  const helmets = ["własny", "S/M", "L/XL"].map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  // WYSYŁKA FORMULARZA
  const sendEmail = (e) => {
    e.preventDefault();
    if (
      !regulationBox ||
      choosenBikes.length < 0 ||
      !name ||
      !email ||
      !phone ||
      !policyBox
    ) {
      return alert("Uzupełnij wszystkie wymagane pola!");
    }
    emailjs
      .sendForm(
        "service_eu28q7p",
        "template_2gciz6b",
        e.target,
        "QPhckFRY63F4zWAKT"
      )
      .then(
        () => {
          e.target.reset();
          setStatus("SUCCESS");
          setTimeout(() => {
            setStatus("");
            setName("");
            setEmail("");
            setPhone("");
            setText("");
            setPedal("własne");
            setHelmet("własny");
            setRegulationBox(false);
            setPolicyBox(false);
            setWithCoachBox(false);
            setChoosenBikes([]);
          }, 3000);
        },
        () => {
          setStatus("ERROR");
          setTimeout(() => {
            setStatus("");
            setName("");
            setEmail("");
            setPhone("");
            setText("");
            setPedal("własne");
            setHelmet("własny");
            setRegulationBox(false);
            setPolicyBox(false);
            setWithCoachBox(false);
            setChoosenBikes([]);
          }, 3000);
        }
      );
  };

  const handleDelete = (item) => {
    const updateBikes = choosenBikes.filter((el) => el !== item);
    setChoosenBikes(updateBikes);
  };

  return (
    <>
      <Head>
        <title>Cycloagaete | Rezerwacja</title>
        <meta name="description" content="Cycloagaete - Rezerwacja" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="shortcut icon" href="/logo192.png" />
      </Head>{" "}
      <Wrapper>
        <div className="title">
          <div className="titleLine"></div>
          <h2>Rezerwacja</h2>
          <div className="titleLine"></div>
        </div>
        <form className="content" onSubmit={(e) => sendEmail(e)}>
          {/* section 1 */}
          <section className="oneSection" data-aos="fade-up">
            <span className="numberSection">1.</span>
            <div className="details">
              <h3 className="sectionName">Zapoznaj się z regulaminem</h3>
              <p className="sectionInfo sectionInfoMobile">
                Przed dokonaniem rezerwacji przeczytaj regulamin wypożyczenia
                roweru.
                <Link href="/regulations">
                  <button className="buttonLink" type="button">
                    Regulamin
                  </button>
                </Link>
              </p>
              <div className="labelCookieContainer">
                <label className="labelCheck" htmlFor="accept">
                  <p className="sectionInfo">
                    <input
                      type="checkbox"
                      id="accept"
                      name="accept"
                      required
                      checked={regulationBox}
                      onChange={() => setRegulationBox(!regulationBox)}
                    />
                    Oświadczam że zapoznałem się z regulaminem i go akceptuję.
                  </p>
                </label>
              </div>
            </div>
          </section>
          {/* section 2 */}
          <section className="oneSection" data-aos="fade-up">
            <span className="numberSection">2.</span>
            <div className="details detailsCarouzel">
              <h3 className="sectionName">Wybierz dla siebie rower</h3>
              <p className="sectionInfo sectionInfoMobile">
                Wybierz jeden lub więcej rowerów z listy poniżej lub przejdź do
                zakładki ROWERY, aby zobaczyć wszystkie.{" "}
                <Link href="/bikes">
                  <button type="button" className="buttonLink">
                    Rowery
                  </button>
                </Link>
              </p>
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
              <div className="choosenBikes">
                <h4>Wybrane rowery:</h4>
                {choosenBikes.length > 0 ? (
                  <ul>
                    {choosenBikes.map((item, index) => {
                      return (
                        <li key={index}>
                          <MdPedalBike /> {item}
                          <input type="hidden" name="bikeList" value={item} />
                          <IoClose onClick={() => handleDelete(item)} />
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="noBikes">
                    Jeszcze żaden rower nie został wybrany!
                  </p>
                )}
              </div>
            </div>
          </section>
          {/* section 3 */}
          <section className="oneSection formSection" data-aos="fade-up">
            <span className="numberSection">3.</span>
            <div className="details">
              <h3 className="sectionName">Wypełnij formularz</h3>
              <p className="sectionInfo">
                Uzupełnij formularz swoimi danymi. Wybierz dogodny dla siebie
                czas odbioru sprzętu oraz dodatki.
              </p>
              <div className="formContainer">
                <div className="formInput inputName">
                  <label htmlFor="name">Imię i Nazwisko</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inputs">
                  <div className="formInput">
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="phone">Telefon</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      minLength={9}
                      maxLength={12}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <h4 className="dateTitle">Termin wypożyczenia</h4>
                <div className="inputsDate">
                  <div className="formInput">
                    <label htmlFor="dateStart">Od:</label>
                    <input
                      id="dateStart"
                      type="date"
                      name="dateStart"
                      value={dateStart}
                      min={minDate}
                      onChange={(e) => setDateStart(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="dateEnd">Do:</label>
                    <input
                      id="dateEnd"
                      type="date"
                      name="dateEnd"
                      value={dateEnd}
                      min={minDate2}
                      onChange={(e) => setDateEnd(e.target.value)}
                    />
                  </div>
                  <h4>
                    Liczba dni: <span>{daysNumber}</span>
                  </h4>
                </div>
                <h4 className="dateTitle">Dodatki</h4>
                <div className="inputsDate">
                  <div className="formInput">
                    <label htmlFor="pedal">Wybór pedałów:</label>
                    <select
                      name="pedal"
                      id="pedal"
                      value={pedal}
                      onChange={(e) => setPedal(e.target.value)}
                    >
                      {pedals}
                    </select>
                  </div>
                  <div className="formInput">
                    <label htmlFor="helmet">Wybór kasku:</label>
                    <select
                      name="helmet"
                      id="helmet"
                      value={helmet}
                      onChange={(e) => setHelmet(e.target.value)}
                    >
                      {helmets}
                    </select>
                  </div>
                  <h4 className="pedalHelmet">*Pedały/Kask - 3 euro/dzień</h4>
                </div>
                <div className="labelCookieContainer2">
                  <label className="labelCheck" htmlFor="withCoachBox">
                    <p className="coachInfo">
                      <input
                        type="checkbox"
                        id="withCoachBox"
                        // name="withCoachBox"
                        checked={withCoachBox}
                        onChange={() => setWithCoachBox(!withCoachBox)}
                      />
                      <input
                        type="hidden"
                        name="withCoachBox"
                        value={withCoachBox ? "tak" : "nie"}
                      />
                      Jestem zainteresowany/na wycieczką/treningiem z
                      przewodnikiem.
                    </p>
                  </label>
                </div>
                <div className="formInput">
                  <label htmlFor="message">Twoje uwagi...</label>
                  <textarea
                    id="message"
                    name="message"
                    // required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>

                <div className="labelCookieContainer2">
                  <label className="labelCheck" htmlFor="policyBox">
                    <p className="policyAgree">
                      <input
                        type="checkbox"
                        id="policyBox"
                        name="policyBox"
                        required
                        checked={policyBox}
                        onChange={() => setPolicyBox(!policyBox)}
                      />
                      Wyrażam zgodę na przetwarzanie danych osobowych w celu
                      odpowiedzi na mojego e-maila
                      <span
                        onClick={() => setVisibleCookie(true)}
                        className="cookieLink"
                      >
                        (Polityka Prywatności).
                      </span>
                    </p>
                  </label>
                </div>
                <>
                  {status === "SUCCESS" ? (
                    <p className="messageAlert">Wiadomość wysłana! </p>
                  ) : (
                    <button className="sendBtn">Wyślij</button>
                  )}
                  {status === "ERROR" && (
                    <p className="messageAlert">ups... coś poszło nie tak!</p>
                  )}
                </>
              </div>
            </div>
          </section>
          {/* section 4 */}
          <section className="oneSection" data-aos="fade-up">
            <span className="numberSection">4.</span>
            <div className="details">
              <h3 className="sectionName">Opłać rezerwację</h3>
              <p className="sectionInfo">
                Gdy prześlesz do nas formularz rezerwacyjny odpowiemy
                najszybciej jak to będzie możliwe. Jeśli rowery będą dostępne w
                wybranym przez Ciebie terminie, dostaniesz informacje dotyczące
                płatności.
              </p>
              <GiReceiveMoney className="paySvg" />
            </div>
          </section>
          {/* section 5 */}
          <section className="oneSection" data-aos="fade-up">
            <span className="numberSection">5.</span>
            <div className="details">
              <h3 className="sectionName">Odbierz sprzęt</h3>
              <p className="sectionInfo">
                Po opłaceniu rezerwacji, potwierdzeniu Twojej tożsamości i
                podpisaniu umowy przekażemy Ci zamówiony sprzęt. <br /> Odbiór
                pod addresem naszej siedziby:{" "}
                <span>
                  {" "}
                  Calle Maestro Jose Bermudez 5, 1G 35480 Agaete, Las Palmas de
                  Gran Canaria, Hiszpania{" "}
                </span>
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4185.385869082698!2d-15.703949287680176!3d28.10152308590123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc408b6ed78d535b%3A0xd8fa937f91bbf379!2sC.%20Jos%C3%A9%20Berm%C3%BAdez%2C%205%2C%2035480%20Agaete%2C%20Las%20Palmas%2C%20Hiszpania!5e0!3m2!1spl!2spl!4v1674217837512!5m2!1spl!2spl"
                className="map"
                title="mapa"
                allowfullscreen=""
                loading="lazy"
              ></iframe>{" "}
            </div>
          </section>
          {/* section 6 */}
          <section className="oneSection" data-aos="fade-up">
            <span className="numberSection">6.</span>
            <div className="details">
              <h3 className="sectionName">Zwróć sprzęt</h3>
              <p className="sectionInfo">
                Gdy już zakończysz swoją podróż rowerem, zwróć komplet sprzętu
                do nas.
              </p>
              <TbArrowBack className="paySvg" />
            </div>
          </section>
          {/* end reservation*/}
          <section className="oneSection">
            <div className="details">
              <h3 className="sectionName lastSectionName">To już wszystko !</h3>
              <p className="sectionInfo lastSection">
                Ekipa Cycloagaete życzy Tobie/Wam udanej zabawy. Mamy nadzieję,
                że nasze usługi spełnią wszelkie oczekiwania. <br /> <br />{" "}
                POWODZENIA NA TRASIE <FaSmileWink />
              </p>
            </div>
          </section>
        </form>
      </Wrapper>
      {visibleCookie && <RodoCookies setVisibleCookie={setVisibleCookie} />}
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 80vh;
  margin: 0 auto;
  padding-top: 10vh;
  position: relative;
  @media screen and (max-width: 800px) {
    padding-top: 0vh;
  }
  .title {
    margin-top: 10vh;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
      margin: 10vh auto 5vh;
      h2 {
        width: 70vw;
      }
    }
  }
  .titleLine {
    background: var(--secondaryColor);
    height: 2px;
    width: 0;
    animation: growLine 3s ease 1 forwards;
  }
  @keyframes growLine {
    100% {
      width: 35vw;
    }
  }
  @media screen and (max-width: 800px) {
    @keyframes growLine {
      100% {
        width: 15vw;
      }
    }
  }
  .content {
    width: 80vw;
    margin: 10vh auto 10vh;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 800px) {
      width: 100vw;
      margin: 5vh auto 10vh;
    }
    .oneSection {
      display: flex;
      align-items: flex-start;
      /* justify-content: space-between; */
      justify-content: center;
      border-bottom: 1px solid var(--secondaryColor3);
      padding: 5vh 3vw 10vh;
      position: relative;
      @media screen and (max-width: 800px) {
        padding: 12vh 0vw 10vh;
      }
      :nth-last-of-type(1) {
        border-bottom: none;
        margin-top: 5vh;
        @media screen and (max-width: 800px) {
          margin-top: 0vh;
        }
      }
      .numberSection {
        font-size: 10rem;
        color: #333;
        font-family: var(--headerFont);
        position: absolute;
        top: 5vh;
        left: 0vw;
        @media screen and (max-width: 800px) {
          font-size: 3rem;
          /* top: 5vh; */
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .details {
        width: 85%;
        @media screen and (max-width: 800px) {
          width: 100%;
        }
        .paySvg {
          font-size: 5rem;
          color: var(--secondaryColor3);
          margin: 3vh auto 0;
          display: block;
          @media screen and (max-width: 800px) {
            font-size: 4rem;
            margin: 5vh auto 0;
          }
        }
        .sectionName {
          font-family: var(--headerFont);
          font-size: 1.9rem;
          text-transform: uppercase;
          text-align: center;
          margin: 5vh auto;
          @media screen and (max-width: 800px) {
            font-size: 1.6rem;
            width: 90%;
          }
        }
        .lastSectionName {
          color: var(--secondaryColor3);
        }
        .sectionInfo {
          font-weight: 500;
          font-size: 1.2rem;
          text-align: center;
          @media screen and (max-width: 800px) {
            width: 90%;
            margin: 0 auto;
          }
          span {
            font-weight: 600;
            color: var(--secondaryColor3);
          }
        }
        .sectionInfoMobile {
          @media screen and (max-width: 800px) {
            display: flex;
            flex-direction: column;
          }
        }
        .lastSection {
          font-size: 1.4rem;
          @media screen and (max-width: 800px) {
            font-size: 1.2rem;
          }
          svg {
            color: var(--secondaryColor3);
            margin: 5px auto 0 10px;
          }
        }
        .buttonLink {
          margin: 0vh auto 3vh 2vw;
          @media screen and (max-width: 800px) {
            font-size: 1.3rem;
            margin: 5vh auto;
          }
        }
        .labelCookieContainer {
          width: 80%;
          margin: 0 auto;
          p {
            cursor: pointer;
            display: flex;
            /* align-items: center; */
            font-weight: 600;
            font-family: var(--headerFont);
            input {
              margin-right: 10px;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      .detailsCarouzel {
        width: 95%;
        @media screen and (max-width: 800px) {
          width: 100%;
        }
      }
    }
  }

  .carousel {
    height: 70vh;
    @media screen and (min-height: 800px) {
      height: 60vh;
    }
    @media screen and (max-width: 800px) {
      width: 100vw;
      height: auto;
      position: relative;
      padding: 5vh 0 10vh;
    }
    .oneBike {
      width: 95%;
      margin-top: 3vh;
      @media screen and (max-width: 800px) {
        width: 100%;
      }
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

  .choosenBikes {
    margin: 5vh auto 0;
    width: 80%;
    padding: 2vh 2vw;
    /* border: 2px solid #111; */
    background: var(--secondaryColorBg);
    @media screen and (max-width: 800px) {
      width: 100%;
      padding: 4vh 2vw;
      margin: 5vh auto -10vh;
    }
    h4 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 3vh;
    }
    ul {
      list-style: none;
      li {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        font-weight: 500;
        margin-bottom: 1vh;
        @media screen and (max-width: 800px) {
          font-size: 1.1rem;
          margin-bottom: 2vh;
        }
        svg {
          color: var(--secondaryColor3);
          margin-right: 20px;
          flex-shrink: 0;
          font-size: 1.4rem;
          @media screen and (max-width: 800px) {
            margin-right: 10px;
          }
          :nth-of-type(2) {
            margin-left: 10px;
            font-size: 1.6rem;
            cursor: pointer;
            transition: 0.3s;
            color: var(--deleteColor);
            :hover {
              transform: scale(1.3);
              @media screen and (max-width: 800px) {
                transform: scale(1);
              }
            }
          }
        }
      }
    }
    .noBikes {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 500;
      color: var(--secondaryColor3);
      @media screen and (max-width: 800px) {
        width: 90%;
        margin: 0 auto;
      }
    }
  }

  /* FORM */
  .formContainer {
    width: 80%;
    margin: 0 auto;
    @media screen and (max-width: 800px) {
      width: 90%;
      margin: 5vh auto 0;
    }
  }
  .formSection {
    .sectionInfo {
      margin-bottom: 3vh;
    }
    .formInput {
      display: flex;
      flex-direction: column;
    }
    .inputName {
      width: 100%;
      margin: 2vh auto;
    }
    input,
    select {
      border-radius: 5px;
      padding: 5px 20px;
      font-size: 1.2rem;
      border: 2px solid var(--secondaryColor);
      font-family: var(--textFont);
    }
    label {
      font-size: 1.2rem;
      margin-bottom: 1vh;
      font-family: var(--headerFont);
      font-weight: 600;
    }
    .inputs {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2vh auto;
      @media screen and (max-width: 800px) {
        flex-direction: column;
      }
      .formInput {
        width: 45%;
        @media screen and (max-width: 800px) {
          width: 100%;
          margin-bottom: 2vh;
        }
      }
      input {
        width: 100%;
      }
    }
    .inputsDate {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 2vh auto 5vh;
      @media screen and (max-width: 800px) {
        flex-direction: column;
      }
      .formInput {
        width: 34%;
        margin-right: 2%;
        @media screen and (max-width: 800px) {
          width: 80%;
          margin-right: 0%;
          margin-bottom: 1vh;
        }
      }
      input {
        width: 100%;
      }
      h4 {
        font-size: 1.3rem;
        font-family: var(--headerFont);
        text-transform: uppercase;
        margin-top: 4vh;
        margin-right: 2vw;
        span {
          color: var(--secondaryColor);
          font-size: 1.5rem;
        }
      }
      .pedalHelmet {
        font-size: 1.1rem;
      }
    }
    textarea {
      width: 100%;
      margin: 0vh auto 2vh;
      min-height: 20vh;
      padding: 20px 20px;
      border-radius: 5px;
      font-size: 1.1rem;
      border: 2px solid var(--secondaryColor);
      font-family: var(--textFont);
      line-height: 1.2;
      @media screen and (max-width: 800px) {
        font-size: 1rem;
        padding: 8px 10px;
        min-height: 15vh;
        border: 2px solid var(--secondaryColor);
      }
    }
  }
  .labelCookieContainer2 {
    margin: 2vh auto;
    p {
      @media screen and (max-width: 800px) {
        font-size: 1.2rem;
      }
      input {
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
    }
    .policyAgree {
      @media screen and (max-width: 800px) {
        font-weight: 500;
      }
    }
    .coachInfo {
      color: var(--secondaryColor3);
      display: flex;
      align-items: center;
    }
  }
  .dateTitle {
    text-align: center;
    font-size: 1.4rem;
    margin: 4vh auto 1vh;
    text-transform: uppercase;
    font-family: var(--headerFont);
  }
  .sendBtn {
    width: 30%;
    border: none;
    border-radius: 5px;
    font-size: 1.3rem;
    font-family: var(--headerFont);
    text-transform: uppercase;
    padding: 10px 0px;
    margin: 5vh auto 0;
    font-weight: 600;
    color: #fff;
    background: var(--secondaryColor3);
    transition: 0.4s;
    cursor: pointer;
    display: block;
    :hover {
      letter-spacing: 5px;
    }
    @media screen and (max-width: 800px) {
      width: 60%;
      padding: 8px 0px;
      font-weight: 500;
      font-size: 1.3rem;
      letter-spacing: 3px;
      :hover {
        letter-spacing: 3px;
      }
    }
  }
  .messageAlert {
    font-family: var(--headerFont);
    font-size: 1.4rem;
    text-transform: uppercase;
    color: var(--secondaryColor3);
    margin: 3vh auto;
    text-align: center;
    font-weight: 500;
  }
  .map {
    width: 70%;
    height: 40vh;
    margin: 5vh auto 0;
    display: block;
    border: 2px solid var(--secondaryColor);
    @media screen and (max-width: 800px) {
      width: 100%;
      margin: 8vh auto -10vh;
      border: 2px solid var(--secondaryColor3);
      border-bottom: 1px solid var(--secondaryColor3);
    }
  }
`;

export default Reservation;
