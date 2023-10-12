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
import { FaTrashAlt } from "react-icons/fa";

const Protected = ({ data_onas, data_galeria }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [activeData, setActiveData] = useState(null);
  const [onasInfo, setOnasInfo] = useState(data_onas.onas[0].info);
  const [imagesCloudinary, setImagesCloudinary] = useState(data_galeria);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1000, disable: "false" });
  }, []);

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
      name: "Regulamin",
    },
  ];

  const confirmationTime = () => {
    setConfirmation(true);
    setTimeout(() => {
      setConfirmation(false);
    }, 2000);
  };

  // O NAS
  const updateOnas = async (e) => {
    e.preventDefault();
    const toUpdate = onasInfo;
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        info: toUpdate,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/onas`,
      postData
    );
    const response = await res.json();
    if (response.response.message !== "success") return;
    confirmationTime();
  };
  // END O NAS

  // GALERIA

  // END GALERIA

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
                <>
                  <h2 className="contentTitle">
                    {activeData.name} - <span>edycja</span>
                  </h2>
                  <form onSubmit={(e) => updateOnas(e)}>
                    <textarea
                      value={onasInfo}
                      onChange={(e) => setOnasInfo(e.target.value)}
                    ></textarea>
                    <button type="submit" className="save">
                      Zapisz zmiany!
                    </button>
                  </form>
                </>
              )}
              {activeData.name === "Galeria" && (
                <>
                  <h2 className="contentTitle">
                    {activeData.name} - <span>edycja</span>
                  </h2>
                  <div className="imagesContainer">
                    {data_galeria &&
                      imagesCloudinary.map((item) => {
                        const { id, image } = item;
                        return (
                          <div className="imgWrapper" key={id}>
                            <img src={image} alt="" />
                            <span>
                              <FaTrashAlt
                                className="imgSVG"
                                onClick={() => setConfirmDelete(item)}
                              />
                            </span>
                          </div>
                        );
                      })}
                  </div>
                  {confirmDelete && (
                    <div className="confirmDelete">
                      <h3>Czy na pewno chcesz usunąć to zdjęcie?</h3>
                      <img src={confirmDelete.image} alt="" />
                      <section>
                        <button onClick={() => setConfirmDelete(false)}>
                          Anuluj
                        </button>
                        <button
                          onClick={() => {
                            // deleteImage(confirmDelete.id);
                            setConfirmDelete(null);
                          }}
                        >
                          Tak
                        </button>
                      </section>
                    </div>
                  )}
                  <div className="imgWrapper"></div>
                </>
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
    /* list-style: none; */
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
    form {
      width: 70vw;
      margin: 5vh auto;
      textarea {
        width: 100%;
        height: 30vh;
        padding: 10px;
        font-size: 1rem;
      }
    }
    svg {
      font-size: 5rem;
      margin: 5vh auto;
      text-align: center;
      width: 100%;
      color: var(--secondaryColor3);
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
  .save {
    padding: 5px 20px;
    cursor: pointer;
    font-size: 1rem;
    font-family: var(--headerFont);
    font-weight: 500;
    color: white;
    background-color: var(--secondaryColor3);
    text-transform: uppercase;
    border-radius: 10px;
    border: none;
    transition: 0.4s;
    :hover {
      letter-spacing: 1px;
    }
  }
  .content2 {
    display: flex;
    align-items: center;
    justify-content: center;
    /* flex-direction: column; */
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
  .imagesContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 85vw;
    margin: 5vh auto;
    .imgWrapper {
      position: relative;
      width: 25vw;
      height: 18vw;
      margin-bottom: 5vw;
      box-shadow: 2px 2px 5px 1px #333;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    span {
      position: absolute;
      bottom: 0%;
      right: 0%;
      z-index: 1;
      background-color: rgba(255, 255, 255, 1);
      padding: 10px 20px;
      border-radius: 5px 0 0 0;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      transition: 0.5s;
      :hover {
        opacity: 1;
      }
    }
    .imgSVG {
      color: darkred;
      font-size: 1.6rem;
      cursor: pointer;
    }
  }
  .confirmDelete {
    background-color: #111;
    position: fixed;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border: 2px solid var(--secondaryColor3);
    h3 {
      width: 100%;
      text-align: center;
      font-size: 2rem;
      color: white;
    }
    img {
      width: 22vw;
      height: 14vw;
      object-fit: cover;
      margin: 5vh auto;
    }
    button {
      padding: 10px 20px;
      font-size: 2rem;
      font-family: var(--headerFont);
      border: none;
      border-radius: 5px;
      margin: 0 5vw;
      cursor: pointer;
      opacity: 0.8;
      transition: 0.5s;
      :hover {
        opacity: 1;
      }
      :nth-of-type(2) {
        background-color: darkred;
        color: white;
      }
    }
  }
`;

export default Protected;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const data_onas = await getData("onas");
  const data_galeria = await getGalleryImages();

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
      data_galeria: data_galeria,
    },
  };
};
