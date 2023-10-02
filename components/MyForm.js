import { useState } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import RodoCookies from "./RodoCookies";
import CookieAccept from "./CookieAccept";

const MyForm = () => {
  const [visibleCookie, setVisibleCookie] = useState(false);

  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [box, setBox] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      // .sendForm(
      //   "service_n61nubg",
      //   "template_dhnujxr",
      //   e.target,
      //   "NIJK8PLN6cdaDtmW_"
      // )
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
            setBox(false);
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
            setBox(false);
          }, 3000);
        }
      );
  };

  return (
    <>
      <Wrapper onSubmit={(e) => sendEmail(e)}>
        <input
          className="inputName"
          type="text"
          name="name"
          placeholder="Imię i Nazwisko"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="inputs">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefon"
            minLength={9}
            maxLength={12}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <br />
        <textarea
          placeholder="Twoja wiadomość..."
          name="message"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="labelCookieContainer">
          <label className="labelCheck" htmlFor="accept">
            <p>
              <input
                type="checkbox"
                id="accept"
                name="accept"
                required
                checked={box}
                onChange={() => setBox(!box)}
              />
              Wyrażam zgodę na przetwarzanie danych osobowych w celu odpowiedzi
              na mojego e-maila
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
            <button>Wyślij</button>
          )}
          {status === "ERROR" && (
            <p className="messageAlert">ups... coś poszło nie tak!</p>
          )}
        </>
      </Wrapper>
      {visibleCookie && <RodoCookies setVisibleCookie={setVisibleCookie} />}
      <CookieAccept setVisibleCookie={setVisibleCookie} />
    </>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 800px) {
    width: 95%;
    height: auto;
  }
  input,
  select {
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1.1rem;
    border: 2px solid var(--secondaryColor);
    font-family: var(--textFont);
    @media screen and (max-width: 800px) {
      font-size: 1rem;
      width: 47%;
      padding: 5px 10px;
    }
    ::placeholder {
      color: #888;
    }
  }
  .selectDisabled {
    opacity: 0.4;
  }
  .inputName {
    width: 100%;
    margin-bottom: 2vh;
  }
  .inputs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-bottom: 2vh; */
    input {
      width: 45%;
      @media screen and (max-width: 800px) {
        width: 48%;
      }
    }
  }
  textarea {
    /* background: #eee; */
    width: 100%;
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
  .labelCookieContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-family: var(--textFont);
    font-size: 1.1rem;
    line-height: 1.2;
    label {
      margin: 3vh auto 0;
      @media screen and (max-width: 800px) {
        font-size: 0.9rem;
      }
      input {
        margin-right: 10px;
        cursor: pointer;
        @media screen and (max-width: 800px) {
          font-size: 1rem;
          width: auto;
          padding: 0px;
        }
      }
    }
    .cookieLink {
      color: var(--secondaryColor3);
      cursor: pointer;
      margin-left: 5px;
    }
  }
  button {
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
    :hover {
      letter-spacing: 5px;
    }
    @media screen and (max-width: 800px) {
      width: 60%;
      padding: 5px 0px;
      font-weight: 500;
    }
  }
  .messageAlert {
    font-family: var(--titleFont);
    font-size: 1.2rem;
    text-transform: uppercase;
    color: var(--secondaryColor);
    margin-top: 3vh;
  }
`;

export default MyForm;
