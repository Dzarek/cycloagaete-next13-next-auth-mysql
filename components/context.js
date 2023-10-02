import React, { useState, useContext } from "react";
// import React, { useState, useContext, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [plLanguage, setPlLanguage] = useState(true);
  const [choosenBikes, setChoosenBikes] = useState([]);

  // useEffect(() => {
  //   fetch("https://ip-api.com/json")
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response.countryCode !== "PL") {
  //         setPlLanguage(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Request failed:", err);
  //     });
  // }, []);

  return (
    <AppContext.Provider
      value={{
        plLanguage,
        setPlLanguage,
        choosenBikes,
        setChoosenBikes,
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
