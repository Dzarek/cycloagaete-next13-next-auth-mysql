import styled from "styled-components";
import OneBike from "../OneBike";
import { useState } from "react";
import UploadImage from "./UploadImageNewBike";

const RoweryAdmin = ({ rowerySQL, setRowerySQL }) => {
  const [openModal, setOpenModal] = useState(false);
  const [bikeName, setBikeName] = useState("");
  const [bikeImg, setBikeImg] = useState("");
  const [bikeDetails, setBikeDetails] = useState([]);
  const [bikeDetailsInput, setBikeDetailsInput] = useState("");
  const [bikeInfo, setBikeInfo] = useState("");
  const [bikeSize, setBikeSize] = useState(0);
  const [bikePrices, setBikePrices] = useState({
    one: 0,
    twoFive: 0,
    sixTwelve: 0,
    thirteen: 0,
  });

  const handleAddBikeDetails = () => {
    setBikeDetails([...bikeDetails, bikeDetailsInput]);
    setBikeDetailsInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      bikeName === "" ||
      bikeImg === "" ||
      bikeDetails.length < 1 ||
      bikeInfo === "" ||
      bikeSize < 1 ||
      bikePrices.one < 1 ||
      bikePrices.twoFive < 1 ||
      bikePrices.sixTwelve < 1 ||
      bikePrices.thirteen < 1
    ) {
      return alert("Proszę uzupełnić wszystkie pola!");
    } else {
      const addBike = {
        bikeName: bikeName,
        bikeImg: bikeImg,
        bikeDetails: JSON.stringify(bikeDetails),
        bikeInfo: bikeInfo,
        bikeSize: bikeSize,
        bikePrices: JSON.stringify(bikePrices),
      };

      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newBike: addBike,
        }),
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/rowery`,
        postData
      );
      const response = await res.json();
      if (response.response.message !== "success") return;
    }
  };

  return (
    <Wrapper>
      <h2 className="contentTitle">
        Rowery - <span>edycja</span>
      </h2>
      <div className="content">
        {rowerySQL.map((item, index) => {
          return (
            <article key={index}>
              <span>{index + 1}</span>
              <div className="oneBike">
                <OneBike item={item} />
              </div>
            </article>
          );
        })}
        <button className="buttonLink" onClick={() => setOpenModal(true)}>
          Dodaj Nowy Rower
        </button>
        {openModal && (
          <>
            <button onClick={() => setOpenModal(false)}>
              Anuluj dodawanie
            </button>
            <form className="newBikeForm" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name="bikeName"
                placeholder="Nazwa roweru"
                value={bikeName}
                onChange={(e) => setBikeName(e.target.value)}
                required
              />
              <UploadImage setBikeImg={setBikeImg} />
              <img src={bikeImg} alt="" style={{ width: "200px" }} />
              <div className="bikeDetails">
                <h4>Dane techniczne:</h4>
                <ul>
                  {bikeDetails.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
                <label htmlFor="bikeDetailsInput">Dodaj cechę:</label>
                <input
                  type="text"
                  name="bikeDetailsInput"
                  placeholder="Nowa cecha"
                  value={bikeDetailsInput}
                  onChange={(e) => setBikeDetailsInput(e.target.value)}
                />
                <button type="button" onClick={handleAddBikeDetails}>
                  Dodaj
                </button>
              </div>
              <textarea
                name="bikeInfo"
                placeholder="Opis..."
                value={bikeInfo}
                onChange={(e) => setBikeInfo(e.target.value)}
                required
              ></textarea>
              <label htmlFor="bikeSize">Rozmiar ramy:</label>
              <input
                type="number"
                name="bikeSize"
                value={bikeSize}
                onChange={(e) => setBikeSize(Number(e.target.value))}
                required
              />
              <section className="bikePrices">
                <div className="onePrice">
                  <label htmlFor="oneDay">1 dzień:</label>
                  <input
                    type="number"
                    id="oneDay"
                    name="oneDay"
                    value={bikePrices.one}
                    onChange={(e) =>
                      setBikePrices({
                        ...bikePrices,
                        one: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="onePrice">
                  <label htmlFor="twoFive">2-5 dni:</label>
                  <input
                    type="number"
                    id="twoFive"
                    name="twoFive"
                    value={bikePrices.twoFive}
                    onChange={(e) =>
                      setBikePrices({
                        ...bikePrices,
                        twoFive: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="onePrice">
                  <label htmlFor="sixTwelve">6-12 dni:</label>
                  <input
                    type="number"
                    id="sixTwelve"
                    name="sixTwelve"
                    value={bikePrices.sixTwelve}
                    onChange={(e) =>
                      setBikePrices({
                        ...bikePrices,
                        sixTwelve: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="onePrice">
                  <label htmlFor="thirteen">13 dni:</label>
                  <input
                    type="number"
                    id="thirteen"
                    name="thirteen"
                    value={bikePrices.thirteen}
                    onChange={(e) =>
                      setBikePrices({
                        ...bikePrices,
                        thirteen: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </section>
              <button type="submit" className="save">
                Dodaj!
              </button>
            </form>
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .content {
    width: 80vw;
    margin: 10vh auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    article {
      width: 100%;
      margin-bottom: 10vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 15rem;
        color: #aaa;
      }
      :nth-child(even) {
        flex-direction: row-reverse;
      }
    }
    @media screen and (max-width: 800px) {
      width: 100vw;
      margin: 8vh auto 20vh;

      article {
        flex-direction: column;
        margin-bottom: 7vh;
        span {
          font-size: 5rem;
          margin-bottom: 2vh;
        }
        :nth-child(even) {
          flex-direction: column;
        }
      }
    }
  }
  .oneBike {
    width: 85%;
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }
`;

export default RoweryAdmin;
