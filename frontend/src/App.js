// import logo from './logo.svg';
import './App.css';
import DynamicFormComponent from './components/dynamicSearchForm'

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
    <div className="App">
      <header className="App-header">        
        <p>Search For Me</p>
      </header>
      <DynamicFormComponent />
    </div>
  );
}

export default App;
