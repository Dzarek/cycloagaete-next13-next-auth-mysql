import styled from "styled-components";
import Link from "next/link";
import { BiWinkSmile } from "react-icons/bi";
import { TbFileText, TbEye, TbEdit, TbBike, TbArrowBack } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";

const ShortFaqRegulations = () => {
  return (
    <Wrapper>
      <div className="title">
        <h2>Jak skorzystać z naszej oferty?</h2>
      </div>
      <div className="content">
        <h3>
          Wypożyczenie roweru w <span>Cycloagaete</span> jest łatwe jak jazda z
          górki! Składa się z 6 podstawowych kroków:
        </h3>
        <div className="steps">
          <div className="oneStep">
            <span>1.</span>
            <h4>przeczytaj regulamin</h4>
            <TbFileText />
          </div>
          <div className="oneStep">
            <span>2.</span>
            <h4>wybierz rower</h4>
            <TbEye />
          </div>
          <div className="oneStep">
            <span>3.</span>
            <h4>wypełnij formularz</h4>
            <TbEdit />
          </div>
          <div className="oneStep">
            <span>4.</span>
            <h4>opłać rezerwację</h4>
            <GiReceiveMoney />
          </div>
          <div className="oneStep">
            <span>5.</span>
            <h4>odbierz sprzęt</h4>
            <TbBike />
          </div>
          <div className="oneStep">
            <span>6.</span>
            <h4>zwróć sprzęt</h4>
            <TbArrowBack />
          </div>
        </div>
        <h3> Przekonaj się o tym sam przechodząc do panelu rezerwacji.</h3>
        <Link href="/reservation">Rezerwuj Rower</Link>
        <div className="faqReg">
          <section>
            <h3>Przed dokonaniem rezerwacji zapoznaj się z regulaminem!</h3>
            <Link href="/regulations">Regulamin</Link>
          </section>
          <section>
            <h3>
              Masz pytania?
              <br />
              Tutaj znajdziesz odpowiedzi na te, które są najczęściej zadawane.{" "}
              <BiWinkSmile />
            </h3>
            <Link href="/faq">FAQ</Link>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 40vh;
  margin: 0 auto;
  padding: 5vh 5vw 0;
  position: relative;
  @media screen and (max-width: 800px) {
    padding: 5vh 0vw 0;
  }
  .content {
    width: 100%;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: 1.5rem;
      font-weight: 500;
      text-align: center;
      @media screen and (max-width: 800px) {
        font-size: 1.3rem;
        width: 95%;
        margin: 0 auto;
      }
      span {
        color: var(--secondaryColor3);
        font-weight: 600;
        text-transform: uppercase;
        margin: 0 2px;
      }
    }
    a {
      text-decoration: none;
      background: var(--secondaryColor3);
      padding: 10px 20px;
      text-align: center;
      color: white;
      font-family: var(--headerFont);
      border-radius: 10px;
      font-size: 1.7rem;
      font-weight: 500;
      text-transform: uppercase;
      margin-top: 3vh;
      transition: 0.4s;
      :hover {
        letter-spacing: 5px;
      }
      @media screen and (max-width: 800px) {
        font-size: 1.4rem;
      }
    }
    .steps {
      margin: 5vh auto;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .oneStep {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background: #333;
        color: white;
        padding: 10px;
        height: 220px;
        width: 220px;
        border-radius: 5px;
        font-size: 1.2rem;
        margin: 10px;
        text-align: center;
        border: 2px solid var(--secondaryColor);
        transition: 0.5s;
        span {
          font-family: var(--titleFont);
          font-size: 2rem;
        }
        svg {
          color: var(--secondaryColor);
          font-size: 2.5rem;
        }
        :hover {
          color: #333;
          background: white;
        }
        @media screen and (max-width: 800px) {
          height: 30vh;
          width: 45%;
          margin: 5px;
          justify-content: space-between;
          padding: 20px 10px;
          font-size: 1.1rem;
        }
      }
    }
    .faqReg {
      width: 100%;
      margin: 10vh auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      @media screen and (max-width: 800px) {
        flex-direction: column;
        margin: 5vh auto;
      }
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        @media screen and (max-width: 800px) {
          width: 80%;
          margin: 3vh auto;
        }
        h3 {
          /* display: flex;
          align-items: flex-end;
          justify-content: center; */
          svg {
            margin-left: 10px;
            margin-bottom: -5px;
            color: var(--secondaryColor3);
            @media screen and (max-width: 800px) {
              display: none;
            }
          }
        }
      }
    }
  }
`;

export default ShortFaqRegulations;
