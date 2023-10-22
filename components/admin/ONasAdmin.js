import styled from "styled-components";

const ONasAdmin = ({ onasInfo, setOnasInfo, confirmationTime }) => {
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

  return (
    <Wrapper>
      <h2 className="contentTitle">
        O nas - <span>edycja</span>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
    margin: 7vh auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    textarea {
      width: 100%;
      height: 30vh;
      padding: 10px;
      font-size: 1rem;
    }
  }
  .save {
    padding: 5px 20px;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: var(--headerFont);
    font-weight: 500;
    color: white;
    background-color: var(--secondaryColor3);
    text-transform: uppercase;
    border-radius: 10px;
    border: none;
    transition: 0.4s;
    margin: 5vh auto;
    :hover {
      letter-spacing: 1px;
    }
  }
`;

export default ONasAdmin;
