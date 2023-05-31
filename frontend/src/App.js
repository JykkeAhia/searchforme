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
      <div class="relative -mt-[5.75rem] overflow-hidden pt-[5.75rem]">
        <div class="relative mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
          <header>
            <div class="flex flex-col">
              <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 p-3 lg:px-8">Search For Me</h1>
            
              <nav class="bg-gray-800">
                <div class="flex max-w-7xl items-center justify-between p-2 lg:px-8">
                  <div class="lg:flex lg:gap-x-12">
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"><Link to="/">Home</Link></a>
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"><Link to="/search">Search</Link></a>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        
          <div>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
