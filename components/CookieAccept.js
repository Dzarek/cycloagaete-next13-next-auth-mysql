import CookieConsent from "react-cookie-consent";
import { BiCookie } from "react-icons/bi";

const CookieAccept = ({ setVisibleCookie }) => {
  return (
    <CookieConsent
      buttonText="Akceptuje"
      cookieName="myAwesomeCookieName"
      style={{
        background: "rgba(20,20,20,0.97)",
        fontSize: "18px",
        lineHeight: "1.7",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        fontFamily: '"Barlow Semi Condensed", sans-serif',
        padding: "2.5vh 5vw",
        zIndex: 999999,
      }}
      buttonStyle={{
        color: "#af7512",
        fontSize: "19px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        fontFamily: '"Barlow Semi Condensed", sans-serif',
        fontWeight: "600",
      }}
      expires={7}
    >
      <div className="cookieInfo">
        <BiCookie className="cookieIcon" />
        <p>
          Strona korzysta z plików cookies. Pozostając na niej wyrażasz zgodę na
          ich używanie. <br /> Ze szczegółowymi informacjami dotyczącymi cookies
          na tej stronie można się zapoznać tutaj:
          <button
            className="cookieLink2"
            onClick={() => setVisibleCookie(true)}
          >
            (Polityka Prywatności).
          </button>
        </p>
      </div>
    </CookieConsent>
  );
};

export default CookieAccept;
