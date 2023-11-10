import styled from "styled-components";
import { VscDebugBreakpointData } from "react-icons/vsc";
// import Link from "next/link";
import { useGlobalContext } from "./context";
import { useState, useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import { useRouter } from "next/router";

const OneBike = ({ item, rowerySQL, setRowerySQL, handleEdit }) => {
  const { id, name, img, details, info, size, prices } = item;
  const [activeBike, setActiveBike] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { choosenBikes, setChoosenBikes } = useGlobalContext();

  const handleChooseBike = (name) => {
    const newBikes = [...choosenBikes, name];
    setChoosenBikes(newBikes);
  };
  useEffect(() => {
    if (choosenBikes.includes(name)) {
      setActiveBike(true);
    } else {
      setActiveBike(false);
    }
  }, [choosenBikes]);

  const router = useRouter();

  const deleteBike = async (id) => {
    if (!id) return;
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/rowery`,
      postData
    );
    const response = await res.json();
    if (response.response.message !== "success") return;
    const idToRemove = parseFloat(response.response.id);
    const newDataArray = rowerySQL.filter((item) => item.id !== idToRemove);
    setRowerySQL(newDataArray);
  };
  return (
    <Wrapper>
      {activeBike && <GiCheckMark className="okMark" />}
      <div className={activeBike ? "bikeDisable" : ""}>
        <h3 className="bikeName">{name}</h3>
        <section>
          <img src={img} alt={name} />
          <div className="info">
            <h4>Dane techniczne:</h4>
            <ul>
              {details.map((item, index) => {
                return (
                  <li key={index}>
                    <VscDebugBreakpointData />
                    {item}
                  </li>
                );
              })}
            </ul>
            <h4>Opis:</h4>
            <p>{info}</p>
            <h4>Rozmiar ramy:</h4>
            <p>
              <VscDebugBreakpointData />
              {size}
            </p>
          </div>
        </section>
        <ul className="prices">
          <li>1 dzień - {prices.one} €</li>
          <li>2-5 dni - {prices.twoFive} €/dzień</li>
          <li>6-12 dni - {prices.sixTwelvel} €/dzień</li>
          <li>13 dni - {prices.thirteen} €/dzień</li>
        </ul>
        {router.pathname === "/protected" ? (
          <div className="buttonAdminContainer">
            <button
              type="button"
              className="order"
              onClick={() => handleEdit(id)}
            >
              Edytuj
            </button>
            <button
              type="button"
              className="order"
              onClick={() => setConfirmDelete(true)}
            >
              Usuń
            </button>
          </div>
        ) : (
          <>
            {activeBike ? (
              <button type="button" className="order orderDisabled" disabled>
                Wybrano
              </button>
            ) : (
              <button
                type="button"
                className="order"
                onClick={() => handleChooseBike(name)}
              >
                Wybierz
              </button>
            )}
          </>
        )}
      </div>
      {confirmDelete && (
        <div className="confirmDelete">
          <h3>Czy na pewno chcesz usunąć ten rower?</h3>
          <h4>{name}</h4>
          <img src={img} alt="" />
          <section>
            <button onClick={() => setConfirmDelete(false)}>Anuluj</button>
            <button
              onClick={() => {
                deleteBike(id);
                setConfirmDelete(false);
              }}
            >
              Tak
            </button>
          </section>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--secondaryColor);
  border-radius: 5px;
  position: relative;
  .bikeDisable {
    opacity: 0.5;
    transition: 0.4s;
  }
  .okMark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--primaryColor);
    font-size: 5rem;
    z-index: 9;
    width: 100%;
    height: 100%;
    padding: 20%;
  }
  .bikeName {
    width: 100%;
    text-transform: uppercase;
    background: var(--secondaryColor);
    color: #fff;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    @media screen and (max-width: 800px) {
      font-size: 1.2rem;
      padding: 5px;
    }
  }
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;

    img {
      width: 40%;
      height: 100%;
      object-fit: cover;
    }
    .info {
      width: 57%;
      margin-bottom: 3vh;
      h4 {
        margin-top: 2vh;
        margin-bottom: 0.5vh;
        font-size: 1.2rem;
        text-transform: uppercase;
        color: var(--secondaryColor3);
      }
      li {
        font-size: 1.1rem;
        list-style: none;
        display: flex;
        align-items: center;
        svg {
          margin-right: 3px;
          margin-top: 3px;
          color: var(--secondaryColor);
        }
      }
      p {
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        svg {
          margin-right: 3px;
          margin-top: 3px;
          color: var(--secondaryColor);
        }
      }
    }
    @media screen and (max-width: 800px) {
      flex-direction: column;
      img {
        width: 90%;
      }
      .info {
        width: 95%;
        h4 {
          margin-top: 2vh;
          margin-bottom: 1vh;
          font-size: 1.2rem;
          text-transform: uppercase;
          text-align: center;
          color: var(--secondaryColor3);
        }
        li {
          font-size: 1.1rem;
          list-style: none;
          display: flex;
          align-items: center;
          svg {
            flex-shrink: 0;
            margin-right: 3px;
            margin-top: 3px;
            color: var(--secondaryColor);
          }
        }
        p {
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          svg {
            margin-right: 3px;
            margin-top: 3px;
            color: var(--secondaryColor);
          }
        }
      }
    }
  }
  .prices {
    width: 100%;
    display: flex;
    justify-content: space-between;
    list-style: none;
    /* margin-top: 2vh; */
    li {
      background: var(--secondaryColor3);
      color: #fff;
      padding: 10px;
      width: 25%;
      font-weight: 500;
      font-size: 1.2rem;
      text-align: center;
      :nth-child(even) {
        background: var(--secondaryColor);
      }
    }
    @media screen and (max-width: 800px) {
      flex-direction: column;
      li {
        width: 100%;
        font-weight: 600;
      }
    }
  }
  .order {
    width: 100%;
    padding: 10px;
    background: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    border: none;
    text-transform: uppercase;
    font-family: var(--titleFont);
    letter-spacing: 3px;
    color: rgb(10, 10, 10);
    background: #555;
    color: white;
    transition: 1s;
    cursor: pointer;
    :hover {
      letter-spacing: 10px;
      background: #222;
    }
  }
  .orderDisabled {
    background: white;
    color: #222;
    :hover {
      letter-spacing: 3px;
      background: white;
    }
  }
  .buttonAdminContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .order {
      width: 50%;
      :nth-of-type(2) {
        background-color: darkred;
      }
    }
  }
  .confirmDelete {
    background-color: #111;
    position: fixed;
    z-index: 99999999999999999999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border: 2px solid var(--secondaryColor3);
    h3,
    h4 {
      width: 100%;
      text-align: center;
      font-size: 2rem;
      color: white;
    }
    h4 {
      color: var(--secondaryColor);
      text-transform: uppercase;
      margin: 2vh auto;
      font-family: var(--headerFont);
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

export default OneBike;
