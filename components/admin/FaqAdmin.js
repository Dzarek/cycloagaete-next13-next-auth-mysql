import styled from "styled-components";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { MdExpandMore } from "react-icons/md";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const FaqAdmin = ({ confirmationTime, faqSQL, setFaqSQL }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [faqId, setFaqId] = useState(null);
  const [editing, setEditing] = useState(false);

  const resetForm = () => {
    confirmationTime();
    setNewTitle("");
    setNewInfo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTitle === "" || newInfo === "") {
      return alert("Proszę uzupełnić wszystkie pola!");
    } else {
      const addFAQ = {
        faqId: faqId,
        newTitle: newTitle,
        newInfo: newInfo,
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
          addFAQ: addFAQ,
        }),
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/faq`,
        postData
      );
      const response = await res.json();
      if (response.response.message !== "success") return;
      const newFAQ = response.response.newFAQ;
      setFaqSQL([
        ...faqSQL.filter((item) => item.id !== faqId),
        {
          id: newFAQ.id,
          title: newFAQ.title,
          info: newFAQ.info,
        },
      ]);
      resetForm();
    }
  };

  const handleEdit = (id) => {
    setEditing(true);
    const editedFaq = faqSQL.find((item) => item.id === id);
    const { title, info } = editedFaq;
    setFaqId(id);
    setNewTitle(title);
    setNewInfo(info);
  };

  const deleteFAQ = async (id) => {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/faq`, postData);
    const response = await res.json();
    if (response.response.message !== "success") return;
    const idToRemove = parseFloat(response.response.id);
    const newDataArray = faqSQL.filter((item) => item.id !== idToRemove);
    setFaqSQL(newDataArray);
  };

  return (
    <Wrapper>
      <h2 className="contentTitle">
        FAQ - <span>edycja</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <h3>{editing ? "Edytuj informację" : "Dodaj nową informację"}</h3>
        <input
          type="text"
          placeholder="Tytuł pytania"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="Treść odpowiedzi"
          value={newInfo}
          onChange={(e) => setNewInfo(e.target.value)}
        ></textarea>
        <button type="submit" className="buttonLink">
          {editing ? "edytuj" : "dodaj"}
        </button>
      </form>
      <div className="content">
        <Accordion allowZeroExpanded={true}>
          {faqSQL.map((oneInfo) => {
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
                          <FiEdit
                            className="svgEdit"
                            onClick={() => handleEdit(id)}
                          />
                          <FaTrash
                            className="svgTrash"
                            onClick={() => deleteFAQ(id)}
                          />
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
  );
};

const Wrapper = styled.div`
  .contentTitle {
    text-align: center;
    font-size: 1.8rem;
    text-transform: uppercase;
    margin-bottom: 10vh;
    span {
      color: var(--secondaryColor3);
    }
  }
  .content {
    width: 50vw;
    margin: 2vh auto 0vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15vh;
    @media screen and (max-width: 800px) {
      width: 95vw;
      flex-direction: column;
      margin: 5vh auto 0;
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
      width: 50vw;
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
      height: 100%;
      h3 {
        /* font-family: var(--headerFont); */
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        text-transform: uppercase;
        @media screen and (max-width: 800px) {
          font-size: 1.1rem;
          width: 100%;
        }
        .svgEdit {
          margin-left: 40px;
          transition: 0.5s;
          :hover {
            color: #222;
          }
        }
        .svgTrash {
          margin-left: 20px;
          transition: 0.5s;
          :hover {
            color: #222;
          }
        }
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 0 auto;
    h3 {
      text-transform: uppercase;
      font-size: 1.4rem;
      margin-bottom: 3vh;
    }
    input {
      padding: 10px 20px;
      font-size: 1.2rem;
      width: 100%;
      font-family: var(--textFont);
    }
    textarea {
      width: 100%;
      min-height: 20vh;
      padding: 20px;
      font-size: 1.2rem;
      font-family: var(--textFont);
    }
  }
`;

export default FaqAdmin;
