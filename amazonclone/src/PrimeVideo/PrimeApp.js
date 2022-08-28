import React from "react";
import "./PrimeApp.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";
import Footer from "./Footer";

function PrimeApp() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        isLargeRow
        title="PrimeVideos Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTrending} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <Footer />
    </div>
  );
}

export default PrimeApp;
