import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { getData } from "../lib/datamanagmend";
import { getGalleryImages } from "@/lib/cloudinary";
import Aos from "aos";
import "aos/dist/aos.css";
import { GrStatusGood } from "react-icons/gr";

import ONasAdmin from "@/components/admin/ONasAdmin";
import GaleriaAdmin from "@/components/admin/GaleriaAdmin";
import RoweryAdmin from "@/components/admin/RoweryAdmin";

const Protected = ({ data_onas, data_galeria, data_rowery }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [activeData, setActiveData] = useState(null);
  const [onasInfo, setOnasInfo] = useState(data_onas.onas[0].info);
  const [rowerySQL, setRowerySQL] = useState(data_rowery.rowery);
  const [imagesCloudinary, setImagesCloudinary] = useState(data_galeria);

  useEffect(() => {
    Aos.init({ duration: 1000, disable: "false" });
  }, []);

  useEffect(() => {
    setImagesCloudinary(imagesCloudinary);
  }, [imagesCloudinary]);

  const navSide = [
    {
      id: 1,
      name: "O nas",
    },
    {
      id: 2,
      name: "Galeria",
    },
    {
      id: 3,
      name: "Rowery",
    },
    {
      id: 4,
      name: "Polecane trasy",
    },
    {
      id: 5,
      name: "FAQ",
    },
    {
      id: 6,
      name: "Regulamin",
    },
    {
      id: 7,
      name: "Kontakt",
    },
  ];

  const confirmationTime = () => {
    setConfirmation(true);
    setTimeout(() => {
      setConfirmation(false);
    }, 2000);
  };

  return (
    <Wrapper>
      <header>
        <button
          className="buttonLink logoutBtn"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Wyloguj się
        </button>

        <div className="title">
          <h1>Witaj w Panelu Administratora!</h1>
          <p>edytuj tutaj treść swojej strony</p>
        </div>
        <ul>
          <h3>Menu</h3>
          {navSide.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => setActiveData(item)}
                className={
                  activeData && activeData.name === item.name ? "activeNav" : ""
                }
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </header>
      {confirmation ? (
        <div className="confirmation" data-aos="fade-up">
          <GrStatusGood />
          <h3>zmiany zostały zapisane!</h3>
        </div>
      ) : (
        <>
          {activeData ? (
            <div className="content">
              {activeData.name === "O nas" && (
                <ONasAdmin
                  onasInfo={onasInfo}
                  setOnasInfo={setOnasInfo}
                  confirmationTime={confirmationTime}
                />
              )}
              {activeData.name === "Galeria" && (
                <GaleriaAdmin
                  imagesCloudinary={imagesCloudinary}
                  setImagesCloudinary={setImagesCloudinary}
                />
              )}
              {activeData.name === "Rowery" && (
                <RoweryAdmin
                  rowerySQL={rowerySQL}
                  setRowerySQL={setRowerySQL}
                />
              )}
            </div>
          ) : (
            <div className="content content2">
              <h3 className="contentTitle" data-aos="fade-right">
                Wybierz z menu element do edytowania
              </h3>
              <img src="/images/editAdmin.png" alt="" data-aos="fade-left" />
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  header {
    position: relative;
    padding: 5vh 5vw;
    border-bottom: 2px solid var(--secondaryColor3);
    height: 25vh;
    overflow: hidden;
    background-color: var(--secondaryColorBg);
  }
  .logoutBtn {
    position: absolute;
    top: 0;
    right: 2vw;
    font-size: 1rem;
    :hover {
      letter-spacing: 1px;
    }
  }
  .title {
    display: flex;
    flex-direction: column;
    margin-top: 5vh;
    h1 {
      font-size: 1.6rem;
    }
    p {
      font-size: 1.2rem;
      font-weight: 500;
      color: #666;
      margin-top: 10px;
    }
  }
  ul {
    position: absolute;
    min-width: 20vw;
    overflow: auto;
    top: 0;
    left: 0;
    height: 100%;
    border-right: 2px solid var(--secondaryColor3);
    background-color: var(--secondaryColorBg);
    color: var(--secondaryColor3);
    padding: 20px 30px;
    font-family: var(--titleFont);
    h3 {
      color: #222;
      text-align: center;
      text-transform: uppercase;
      font-size: 1.4rem;
      margin-bottom: 3vh;
    }
    li {
      margin-top: 10px;
      font-weight: 500;
      font-size: 1rem;
      margin-left: 10px;
      list-style: circle;
      cursor: pointer;
    }
    .activeNav {
      background-color: white;
      color: #222;
    }
  }
  .content {
    margin: 10vh auto;
    width: 90vw;
    color: #222;
    .contentTitle {
      text-align: center;
      font-size: 1.8rem;
      text-transform: uppercase;
      span {
        color: var(--secondaryColor3);
      }
    }
  }
  .confirmation {
    margin: 20vh auto 0;
    width: 90vw;
    color: #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg {
      margin-bottom: 5vh;
      font-size: 5rem;
    }
    h3 {
      font-size: 1.4rem;
      color: var(--secondaryColor3);
    }
  }

  .content2 {
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      font-family: var(--titleFont);
      font-weight: 600;
    }
    svg {
      animation: iconAnim 1s infinite alternate;
      margin-top: 7vh;
    }
    img {
      height: 60vh;
      margin-left: 5vw;
    }
    @keyframes iconAnim {
      100% {
        transform: scale(1.1);
      }
    }
  }
`;

export default Protected;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const data_onas = await getData("onas");
  const data_rowery = await getData("rowery");
  const data_galeria = await getGalleryImages("galeria");

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
      props: {
        session: null,
        data_onas: null,
        data_galeria: null,
      },
    };
  }

  return {
    props: {
      session,
      data_onas: data_onas,
      data_rowery: data_rowery,
      data_galeria: data_galeria,
    },
  };
};
