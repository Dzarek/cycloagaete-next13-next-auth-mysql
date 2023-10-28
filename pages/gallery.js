import styled from "styled-components";
import Masonry from "react-masonry-css";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import { useEffect, useState } from "react";

import { getGalleryImages } from "@/lib/cloudinary";

const Gallery = ({ data_galeria }) => {
  const [index, setIndex] = useState(-1);
  useEffect(() => {
    Aos.init({ duration: 1000, disable: "false" });
  }, []);
  const breakpointColumnsObj = {
    default: 3,
    1440: 3,
    900: 2,
    500: 1,
  };

  let galeryAray = [];
  if (data_galeria) {
    galeryAray = data_galeria.map((item) => {
      return { src: item.image };
    });
  }

  return (
    <>
      <Head>
        <title>Cycloagaete | Galeria</title>
        <meta name="description" content="Cycloagaete - Galeria" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="shortcut icon" href="/logo192.png" />
      </Head>
      <Wrapper>
        <div className="title">
          <div className="titleLine"></div>
          <h2>Galeria zdjęć</h2>
          <div className="titleLine"></div>
        </div>
        <div className="galleryContent">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data_galeria &&
              data_galeria.map((item, index) => {
                const { id, image } = item;
                return (
                  <img
                    data-aos="fade-down"
                    className="oneImg"
                    key={id}
                    src={image}
                    alt=""
                    onClick={() => setIndex(index)}
                  />
                );
              })}
          </Masonry>
          <Lightbox
            index={index}
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={galeryAray}
            plugins={[Thumbnails, Fullscreen]}
          />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 80vh;
  margin: 0 auto;
  padding: 10vh 0;
  position: relative;
  @media screen and (max-width: 800px) {
    padding: 0vh 0 5vh;
  }
  .title {
    margin: 10vh auto 5vh;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
      h2 {
        width: 70vw;
      }
    }
    .titleLine {
      background: var(--secondaryColor);
      height: 2px;
      width: 0;
      animation: growLine 3s ease 1 forwards;
      @keyframes growLine {
        100% {
          width: 35vw;
        }
      }
      @media screen and (max-width: 800px) {
        @keyframes growLine {
          100% {
            width: 13vw;
          }
        }
      }
    }
  }
  .galleryContent {
    width: 100vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    flex-wrap: wrap;
    padding: 5vh 5vw;
    @media screen and (max-width: 800px) {
      padding: 15px 2.5vw;
    }
  }
  .oneImg {
    cursor: pointer;
    /* filter: brightness(0.8); */
    transition: 0.2s;
    border: 4px solid #fff;
    :hover {
      border: 4px solid var(--secondaryColor);
    }
  }
  .my-masonry-grid {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
  }

  .my-masonry-grid_column > img {
    background: grey;
    margin: 10px;
    width: 27vw;
    @media screen and (max-width: 800px) {
      width: 95vw;
      margin: 0 auto 10px;
    }
  }
`;

export default Gallery;

export async function getStaticProps() {
  const data_galeria = await getGalleryImages("galeria");

  return {
    props: {
      data_galeria: data_galeria,
    },
    revalidate: 60,
  };
}
