import Head from "next/head";

import Header from "../components/homepage/Header";
import ShortBikes from "../components/homepage/ShortBikes";
import AboutUs from "../components/homepage/AboutUs";
import ShortRoads from "../components/homepage/ShortRoads";
import ShortGallery from "../components/homepage/ShortGallery";
import ShortFaqRegulations from "../components/homepage/ShortFaqRegulations";

import { getData } from "../lib/datamanagmend";

export default function Home({ data_onas, data_rowery }) {
  const dataOnas = data_onas.onas[0].info;
  const bikesArray = data_rowery.rowery;

  return (
    <>
      <Head>
        <title>Cycloagaete</title>
        <meta name="description" content="Cycloagaete" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="shortcut icon" href="/logo192.png" />
      </Head>
      <div>
        <Header />
        <ShortBikes bikesArray={bikesArray} />
        <AboutUs dataOnas={dataOnas} />
        <ShortRoads />
        <ShortGallery />
        <ShortFaqRegulations />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const data_onas = await getData("onas");
  const data_rowery = await getData("rowery");
  return { props: { data_onas: data_onas, data_rowery: data_rowery } };
};
