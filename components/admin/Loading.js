import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <img src="/images/loading.gif" alt="loading" />
      <h3>Wczytywanie...</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 200px;
  }
  h3 {
    text-transform: lowercase;
    font-family: var(--titleFont);
    font-size: 1.4rem;
  }
`;

export default Loading;
