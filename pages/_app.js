"use client";

import "../styles/globals.css";
// import SimpleReactLightbox from "simple-react-lightbox";
import { useState } from "react";
import { useRouter } from "next/router";
import { AppProvider } from "../components/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieAccept from "../components/CookieAccept";
import Cookie from "../components/RodoCookies";
import ChoosenBike from "../components/ChoosenBike";

function MyApp({ Component, pageProps }) {
  const [visibleCookie, setVisibleCookie] = useState(false);
  const router = useRouter();

  return (
    <div className="app">
      <AppProvider>
        {router.pathname !== "/reservation" && <ChoosenBike />}
        {router.pathname !== "/auth/signin" &&
          router.pathname !== "/protected" && <Navbar />}
        {/* <SimpleReactLightbox> */}
        <Component {...pageProps} />
        {/* </SimpleReactLightbox> */}
        {router.pathname !== "/auth/signin" &&
          router.pathname !== "/protected" && <Footer />}
        <CookieAccept setVisibleCookie={setVisibleCookie} />
        {visibleCookie && <Cookie setVisibleCookie={setVisibleCookie} />}
      </AppProvider>
    </div>
  );
}

export default MyApp;
