import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import UploadImage from "./UploadImage";
import { useState } from "react";
import axios from "axios";
import crypto from "crypto";

const GaleriaAdmin = ({ imagesCloudinary, setImagesCloudinary }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);

  // DELETE IMAGE
  const generateSHA1 = (data) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const deleteImage = async (publicId) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const timestamp = new Date().getTime();
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    try {
      const response = await axios.post(url, {
        public_id: publicId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      });

      console.error(response);
      setImagesCloudinary(
        imagesCloudinary.filter((item) => item.id !== publicId)
      );
    } catch (error) {
      console.error(error);
    }
  };
  // END DELETE IMAGE

  return (
    <Wrapper>
      <h2 className="contentTitle">
        Galeria - <span>edycja</span>
      </h2>
      <div className="imagesContainer">
        {imagesCloudinary.map((item) => {
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
            <button onClick={() => setConfirmDelete(null)}>Anuluj</button>
            <button
              onClick={() => {
                deleteImage(confirmDelete.id);
                setConfirmDelete(null);
              }}
            >
              Tak
            </button>
          </section>
        </div>
      )}
      <UploadImage
        imagesCloudinary={imagesCloudinary}
        setImagesCloudinary={setImagesCloudinary}
      />
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
  .imagesContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 80vw;
    margin: 5vh auto;
    .imgWrapper {
      position: relative;
      width: 22vw;
      height: 16vw;
      margin-bottom: 5vw;
      box-shadow: 2px 2px 5px 1px #333;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
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

export default GaleriaAdmin;
