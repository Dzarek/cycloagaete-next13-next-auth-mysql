import styled from "styled-components";
import OneBike from "../OneBike";
import { useState } from "react";
import UploadImage from "./UploadImageNewBike";
import { IoClose } from "react-icons/io5";
import { SiAddthis } from "react-icons/si";

const RoweryAdmin = ({ rowerySQL, setRowerySQL, confirmationTime }) => {
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
  const [bikeId, setBikeId] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleAddBikeDetails = () => {
    setBikeDetails([...bikeDetails, bikeDetailsInput]);
    setBikeDetailsInput("");
  };
  const resetForm = () => {
    confirmationTime();
    setOpenModal(false);
    setBikeId(null);
    setBikeName("");
    setBikeImg("");
    setBikeDetails([]);
    setBikeDetailsInput("");
    setBikeInfo("");
    setBikeSize(0);
    setBikePrices({
      one: 0,
      twoFive: 0,
      sixTwelve: 0,
      thirteen: 0,
    });
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
        bikeId: bikeId,
        bikeName: bikeName,
        bikeImg: bikeImg,
        bikeDetails: JSON.stringify(bikeDetails),
        bikeInfo: bikeInfo,
        bikeSize: bikeSize,
        bikePrices: JSON.stringify(bikePrices),
      };
      let myMethod = "POST";
      if (editing) {
        myMethod = "PUT";
      }
      const postData = {
        method: myMethod,
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
      const newBike = response.response.bike;
      setRowerySQL([
        ...rowerySQL.filter((item) => item.id !== bikeId),
        {
          id: newBike.id,
          name: newBike.name,
          img: newBike.img,
          details: JSON.parse(newBike.details),
          info: newBike.info,
          size: newBike.size,
          prices: JSON.parse(newBike.prices),
        },
      ]);
      resetForm();
    }
  };

  const handleEdit = (id) => {
    setOpenModal(true);
    setEditing(true);
    const editedBike = rowerySQL.find((item) => item.id === id);
    const { name, img, details, info, size, prices } = editedBike;
    setBikeId(id);
    setBikeName(name);
    setBikeImg(img);
    setBikeDetails(details);
    setBikeInfo(info);
    setBikeSize(size);
    setBikePrices(prices);
  };

  const deleteOneDetail = (item) => {
    setBikeDetails(bikeDetails.filter((i) => i !== item));
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
                <OneBike
                  item={item}
                  rowerySQL={rowerySQL}
                  setRowerySQL={setRowerySQL}
                  handleEdit={handleEdit}
                />
              </div>
            </article>
          );
        })}
        {!openModal && (
          <button className="buttonLink" onClick={() => setOpenModal(true)}>
            Dodaj Nowy Rower
          </button>
        )}
        {openModal && (
          <form className="newBikeForm" onSubmit={(e) => handleSubmit(e)}>
            <IoClose
              className="hideModal"
              onClick={() => setOpenModal(false)}
            />
            <h2>
              {editing
                ? "Formularz edycji roweru"
                : "Formularz dodawania roweru"}
            </h2>
            <div className="addImg">
              <h4>Nazwa roweru:</h4>
              <input
                type="text"
                name="bikeName"
                placeholder="wpisz nazwę"
                value={bikeName}
                onChange={(e) => setBikeName(e.target.value)}
                required
                className="longInput"
              />
              {bikeImg === "" ? (
                <div className="imgUpload">
                  <UploadImage setBikeImg={setBikeImg} />
                </div>
              ) : (
                <img src={bikeImg} alt="" />
              )}
            </div>
            <div className="addText">
              <div className="bikeDetails">
                <h4>Dane techniczne:</h4>
                <div className="addDetailInput">
                  <input
                    type="text"
                    name="bikeDetailsInput"
                    placeholder="wpisz nową cechę"
                    value={bikeDetailsInput}
                    onChange={(e) => setBikeDetailsInput(e.target.value)}
                  />
                  <SiAddthis onClick={handleAddBikeDetails} />
                </div>

                <ul>
                  {bikeDetails.map((item, index) => {
                    return (
                      <li key={index}>
                        {item} <IoClose onClick={() => deleteOneDetail(item)} />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <h4>Opis:</h4>
              <textarea
                name="bikeInfo"
                placeholder="Dodaj opis roweru"
                value={bikeInfo}
                onChange={(e) => setBikeInfo(e.target.value)}
                required
              ></textarea>
              <div className="bikeSize">
                <h4>Rozmiar ramy:</h4>
                <input
                  type="number"
                  name="bikeSize"
                  value={bikeSize}
                  onChange={(e) => setBikeSize(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <section className="bikePrices">
              <h4>Cennik:</h4>
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

            <button type="submit" className="buttonLink">
              {editing ? "Zapisz" : "Dodaj"}
            </button>
          </form>
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
  .newBikeForm {
    border: 2px solid var(--secondaryColor);
    position: relative;
    padding: 3vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    min-width: 60vw;
    background: #222;
    color: white;
  }
  .hideModal {
    font-size: 2rem;
    position: absolute;
    right: 5%;
    top: 2%;
    cursor: pointer;
    transition: 1s;
    :hover {
      transform: rotate(180deg);
    }
  }
  h2 {
    width: 100%;
    text-align: center;
    margin-bottom: 5vh;
  }
  .addImg {
    width: 45%;
    margin-right: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      height: 40vh;
      object-fit: cover;
    }
    .imgUpload {
      width: 100%;
      height: 40vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 2vh;
    }
    input {
      margin-bottom: 5vh;
      width: 90%;
      text-transform: uppercase;
      font-weight: 500;
    }
  }
  h4 {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 2vh;
  }
  .addText {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  input {
    padding: 5px 10px;
    font-size: 1.1rem;
    font-family: var(--textFont);
    text-align: center;
    margin-bottom: 2vh;
    border: 2px solid var(--secondaryColor);
  }
  textarea {
    padding: 5px 10px;
    font-size: 1.1rem;
    font-family: var(--textFont);
    margin-bottom: 2vh;
    border: 2px solid var(--secondaryColor);
    height: 20vh;
  }
  label {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 1.1rem;
  }
  .bikePrices {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    padding: 10px 0;
    h4 {
      width: 100%;
      text-align: center;
      margin-bottom: 1vh;
      margin-top: 1vh;
      font-size: 1.4rem;
    }
  }
  .bikeDetails {
    ul {
      list-style: square;
      margin-top: 2vh;
      li {
        font-size: 1.2rem;
        color: var(--secondaryColor);
      }
    }
  }
  .addDetailInput {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 100%;
      margin: 0;
    }
    svg {
      height: 40px;
      font-size: 2.5rem;
      color: var(--secondaryColor);
      cursor: pointer;
    }
  }
  .onePrice {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
  }
  .bikeSize {
    display: flex;
    align-items: center;
    margin-top: 5vh;
    h4 {
      margin: 0 10px 10px 0;
    }
    input {
      width: 120px;
    }
  }
  .longInput {
    width: 100%;
  }
`;

export default RoweryAdmin;
