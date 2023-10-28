import styled from "styled-components";
import OneBike from "../OneBike";

const RoweryAdmin = ({ rowerySQL, setRowerySQL }) => {
  return (
    <Wrapper>
      <h2 className="contentTitle">
        Rowery - <span>edycja</span>
      </h2>
      {/* <div className="content"> */}
      {rowerySQL.map((item, index) => {
        return (
          <article key={index} data-aos="fade-up">
            <span>{index + 1}</span>
            <div className="oneBike">
              <OneBike item={item} />
            </div>
          </article>
        );
      })}
      {/* </div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .content {
    width: 80vw;
    margin: 10vh auto;
    position: relative;
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
