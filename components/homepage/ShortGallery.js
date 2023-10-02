import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { HiChevronDoubleRight } from "react-icons/hi";
import { MdCamera } from "react-icons/md";

const galleryImages = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
];

const ShortGallery = () => {
  const [activeImg, setActiveImg] = useState(galleryImages[0]);
  const [activeIcon, setActiveIcon] = useState(false);
  return (
    <Wrapper
      onMouseOver={() => setActiveIcon(true)}
      onMouseLeave={() => setActiveIcon(false)}
    >
      <div className="lineVertical"></div>
      <div className="lineVertical2"></div>
      <div className="lineHorizontal"></div>
      <div className="lineHorizontal2"></div>
      <MdCamera
        className={activeIcon ? "cameraIcon activeCameraIcon" : "cameraIcon"}
      />
      <div className="content">
        <div className="title">
          <h2>Tak to wygląda w Cycloagaete...</h2>
        </div>
        <main>
          <section className="allImages">
            {galleryImages.map((item, index) => {
              return (
                <img
                  onClick={() => setActiveImg(item)}
                  key={index}
                  src={item}
                  alt=""
                  className={activeImg === item ? "activeImg" : null}
                />
              );
            })}
          </section>
          <section className="activeImage">
            <img src={activeImg} alt="" />
            <Link href="/gallery">
              <p className="galleryLink">
                Przejdź do galeri zdjęć <HiChevronDoubleRight />
              </p>
            </Link>
          </section>
        </main>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 85vw;
  min-height: 60vh;
  margin: 10vh auto;
  padding: 7vh 5vw;
  position: relative;
  border: 3px solid var(--secondaryColor);
  border-radius: 30px;
  @media screen and (max-width: 800px) {
    width: 95vw;
  }
  .content {
    z-index: 2;
    position: relative;
  }
  .lineVertical {
    z-index: 2;
    background: white;
    height: 60%;
    width: 4px;
    position: absolute;
    top: 50%;
    left: -4px;
    transform: translateY(-50%);
  }
  .lineVertical2 {
    z-index: 2;
    background: white;
    height: 60%;
    width: 4px;
    position: absolute;
    top: 50%;
    right: -4px;
    transform: translateY(-50%);
  }
  .lineHorizontal {
    z-index: 3;
    background: white;
    height: 4px;
    width: 70%;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
  }
  .lineHorizontal2 {
    z-index: 3;
    background: white;
    height: 4px;
    width: 70%;
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
  }
  .title {
    justify-content: flex-end;
    @media screen and (max-width: 800px) {
      justify-content: center;
    }
  }
  main {
    margin-top: 5vh;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
  }
  .cameraIcon {
    font-size: 8rem;
    align-self: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    opacity: 0.1;
  }
  .activeCameraIcon {
    animation: cameraRotate 3s linear infinite;
    @keyframes cameraRotate {
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  }
  .allImages {
    width: 45%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: -2vw;
    @media screen and (max-width: 800px) {
      width: 100%;
      margin-left: 0vw;
      justify-content: space-between;
    }
    img {
      width: 40%;
      height: 15vh;
      object-fit: cover;
      margin: 15px;
      box-shadow: 2px 2px 5px 0px var(--secondaryColor3);
      cursor: pointer;
      filter: saturate(0.8);
      transition: 0.4s;
      :hover {
        filter: saturate(1);
      }
      @media screen and (max-width: 800px) {
        margin: 0px;
        margin-bottom: 10px;
        width: 46%;
        :hover {
          filter: saturate(0);
        }
      }
    }
    .activeImg {
      filter: saturate(0);
    }
  }
  .activeImage {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 800px) {
      width: 100%;
    }
    img {
      width: 90%;
      height: 40vh;
      object-fit: cover;
      margin-bottom: 5vh;
      margin-top: 20px;
      border: 2px solid var(--secondaryColor3);
      border-radius: 5px;
      margin-left: 7vw;
      @media screen and (max-width: 800px) {
        width: 100%;
        margin-left: 0vw;
        height: 30vh;
        margin-top: 5vh;
      }
    }
    .galleryLink {
      font-size: 1.8rem;
      color: var(--primaryColor);
      text-decoration: none;
      font-weight: 500;
      text-transform: uppercase;
      font-family: var(--headerFont);
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-left: 7vw;
      svg {
        color: var(--secondaryColor);
        margin: 2px auto 0 10px;
        font-size: 2.8rem;
      }
      :hover svg {
        animation: iconMove 1s linear infinite;
      }
      @media screen and (max-width: 800px) {
        font-size: 1.5rem;
        margin-left: 0;
        svg {
          font-size: 2rem;
          margin: 2px auto 0 5px;
          animation: iconMove 3s linear infinite;
        }
      }
    }
    @keyframes iconMove {
      0% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(20px);
      }
    }
  }
`;

export default ShortGallery;
