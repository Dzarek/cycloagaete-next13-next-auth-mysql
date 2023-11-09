import { createContext, useEffect, useState } from "react";
import { RiUpload2Fill } from "react-icons/ri";
import styled from "styled-components";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId, setBikeImg }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            // console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
            setBikeImg(result.info.secure_url);
          }
        }
      );
      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <StyledBtn type="button" onClick={initializeCloudinaryWidget}>
        Dodaj zdjęcie <br />
        <RiUpload2Fill />
      </StyledBtn>
    </CloudinaryScriptContext.Provider>
  );
}

const StyledBtn = styled.button`
  text-decoration: none;
  background: var(--secondaryColor3);
  padding: 10px 20px;
  text-align: center;
  color: white;
  font-family: var(--headerFont);
  border-radius: 10px;
  font-size: 1.7rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 3vh;
  transition: 0.4s;
  border: none;
  cursor: pointer;
  svg {
    color: white !important;
    font-size: 2rem !important;
    margin: 10px auto !important;
  }
  :hover {
    background: var(--secondaryColor);
  }
`;

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
