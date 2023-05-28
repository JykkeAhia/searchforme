import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

/* TODO
 1. systeemin pääsivulla on seuraavia ominaisuuksia:
 - voi valita dropdown menusta minkä searchin haluaa käynnistää (nämä saadaan jotenkin kysyttyä API:sta)
 - valinnan jälkeen systeemi hakee haku formin luomista varten kyseisen searchin api endpointista options kutsulla parametrit formia varten
 - sitten luodaan formi em. perustuen (huomioidan pakolliset kentät ja parametrien tyypit)
 - haun description selventää millaisesta hausta on kyse??
 - haku voidaan asettaa heti käyntiin tai voidaan valita, että haku toteutetaan vaikka kerran tunnissa tms. 
 2. toisella sivulla on tuloksia / tai samalla??
 - tulokset saadaan excel tyyppiseen taulukkoon (otetaan valmis komponentti/kirjasto tähän)
 - lisäksi voidaan dataa esittää kaaviona (jos kyseessä lista eventeistä jolloin saadaan aikaan sidottu historia)
 - samaan aikasidonnaiseen kaavioon voidaan asettaa useampia tallennettuja hakuja
 (version 2)
 xstate käyttöön
 react context käyttöön
*/

function App() {
  return (
    <Router>
      <div className="App">
      <header className="TODO">        
        <h1>Search For Me</h1>
      </header>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
