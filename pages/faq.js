// import { useGlobalContext } from "../components/context";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { MdExpandMore } from "react-icons/md";
import Head from "next/head";

import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const questionImg = "/images/questionImg.png";

const Faq = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, disable: "mobile" });
  }, []);

  const questions = [
    {
      id: 1,
      title: "W JAKI SPOSÓB DOKONAĆ REZERWACJI?",
      info: 'Wybierz odpowiedni rower a następnie kliknij "zamów teraz". Wypełnij pozostałe pola (imię nazwisko, termin wypożyczenia, wybór pedałów czy kasku). Kliknij "rezerwuję". W ciągu 6-24 godzin otrzymasz potwierdzenie rezerwacji. Prosimy o dokonywanie rezerwacji z 1 dniowym wyprzedzeniem.',
    },
    {
      id: 2,
      title: "GDZIE ZNAJDUJE SIĘ WYPOŻYCZALNIA?",
      info: "Wypożyczalnia znajduje się w prywatnym domu w urbanizacji Las Candelarias w miejscowości Agaete. Najłatwiej będzie dotrzeć poprzez aplikację google maps wpisując adres podany na stronie www.cycloagaete.com. Jeżeli masz problemy z dotarciem zadzwoń na hiszpański bądź polski numer dostępny na stronie www.cycloagaete.com.",
    },
    {
      id: 3,
      title: "JAKI RODZAJ PEDAŁÓW ZATRZASKOWYCH POSIADAJĄ ROWERY?",
      info: "Rowery mogą być wyposażone w systemy SPD MTB, SPD-SL, LOOK lub Crank Brothers. Prosimy o przekazanie informacji w zamówieniu.",
    },
    {
      id: 4,
      title: "ILE WYNOSI KAUCJA ZA ROWER? CZY MOGĘ ZAPŁACIĆ KARTĄ KREDYTOWĄ?",
      info: "Kaucja za rower wynosi 100 euro. Preferujemy gotówkę która zostanie zwrócona po oddaniu roweru.",
    },
    {
      id: 5,
      title: "CZY ROWER POSIADA UBEZPIECZENIE?",
      info: "Nie, rowery nie są ubezpieczone. Oznacza to że wszelkie uszkodzenia wynikające z niewłaściwego użytkowania czy wypadku ponosi osoba która wypożyczyła rower.",
    },
    {
      id: 6,
      title: "KIEDY ROWER NALEŻY ODDAĆ?",
      info: "Pełny dzień wypożyczenia trwa od 9 rano do 9 wieczorem. Za każdy dzień opóźnienia w oddaniu roweru będzie pobierana opłata w wysokości 30 euro za każdą kolejną dobę.",
    },
  ];

  return (
    <>
      <Head>
        <title>Cycloagaete | FAQ</title>
        <meta name="description" content="Cycloagaete - FAQ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="shortcut icon" href="/logo192.png" />
      </Head>
      <Wrapper>
        <div className="title">
          <div className="titleLine2"></div>
          <h2>Najczęściej zadawane pytania</h2>
          <div className="titleLine2"></div>
        </div>
        <div className="content">
          <img src={questionImg} alt="" />
          <Accordion allowZeroExpanded={true}>
            {questions.map((oneInfo) => {
              const { title, info, id } = oneInfo;
              return (
                <AccordionItem key={id} className="singleQuestion">
                  <div>
                    <header>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <h3>
                            <button type="button" className="btn">
                              <MdExpandMore />
                            </button>
                            {title}
                          </h3>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                    </header>
                    <AccordionItemPanel>
                      <p>{info}</p>
                    </AccordionItemPanel>
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 80vh;
  margin: 0 auto;
  padding: 10vh 0 0;
  position: relative;
  @media screen and (max-width: 800px) {
    padding: 0vh 0;
  }
  .title {
    margin: 10vh auto;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
      margin: 10vh auto 5vh;
      h2 {
        width: 70vw;
      }
    }
    h2 {
      color: var(--secondaryColor3);
    }
    .titleLine2 {
      background: var(--secondaryColor);
      height: 2px;
      width: 0;
      animation: growLine2 3s ease 1 forwards;
      @keyframes growLine2 {
        100% {
          width: 25vw;
        }
      }
      @media screen and (max-width: 800px) {
        @keyframes growLine2 {
          100% {
            width: 14vw;
          }
        }
      }
    }
  }
  .content {
    width: 70vw;
    margin: 10vh auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15vh;
    @media screen and (max-width: 800px) {
      width: 95vw;
      flex-direction: column;
      margin: 5vh auto 0;
    }
    img {
      height: 40vh;
      opacity: 0.8;
      animation: imgRotate 3s infinite alternate;
    }
    @keyframes imgRotate {
      100% {
        transform: scale(1.1);
      }
    }
    @media screen and (max-width: 800px) {
      flex-direction: column;
      align-items: center;
      img {
        animation: none;
        height: 15vh;
        margin-bottom: 5vh;
      }
    }

    .accordion__panel {
      animation: fadein 0.5s ease-in;
      overflow: hidden;
    }
    @keyframes fadein {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .btn {
      background: transparent;
      border: none;
      font-size: 2rem;
      color: white;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: 0.4s;
      margin-right: 10px;
      margin-left: 10px;
      @media screen and (max-width: 800px) {
        font-size: 1.8rem;
      }
      :hover {
        color: var(--secondaryColor3);
      }
    }

    .singleQuestion {
      margin: 2vh auto;
      width: 45vw;
      background: #fff;
      /* color: var(--secondaryColor2); */
      border-radius: 5px;
      border: 2px solid var(--secondaryColor2);
      font-family: var(--buttonFont);
      padding: 2px;

      @media screen and (max-width: 800px) {
        width: 90vw;
      }
      p {
        margin: 2vh auto;
        font-family: var(--textFont);
        font-size: 1.2rem;
        font-weight: 400;
        padding: 20px 25px;
        line-height: 1.5;
        @media screen and (max-width: 800px) {
          text-align: justify;
          line-height: 1.4;
          font-size: 1.1rem;
          font-weight: 500;
          margin: 1vh auto;
          padding: 10px 15px;
        }
      }
    }

    header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-shrink: 0;
      background: var(--secondaryColor);
      color: white;
      padding: 15px 15px;

      h3 {
        /* font-family: var(--headerFont); */
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        width: 50vw;
        @media screen and (max-width: 800px) {
          font-size: 1.1rem;
          width: 100%;
        }
      }
    }
  }
`;

export default Faq;

// export const getServerSideProps = async (context) => {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };
