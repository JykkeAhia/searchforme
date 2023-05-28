import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchListComponent = () => {
    const [searches, setSearches] = useState({});
    const [options, setOptions] = useState({}); // TODO tää tieto pitäisi olla Contextissa tai muussa globaalissa tilassa tms. 

    useEffect(() => {
        fetchSearches();
    }, []);

    const fetchSearches = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/allsavedsearches/');
            setSearches({searches: response.data});
            // console.log(response.data);
            const searchNames = Object.keys(response.data).map(key => {
                return {key: fetchOptions(key)};
            })
            console.log(searchNames);
        } catch (error) {
            console.error(error);
        }
    };

    // TODO siirretään contextiin ja lisäksi pitää tallentaa eri hakujen nimen alle optionssien tiedot 
    const fetchOptions = async (script) => {
        if (script !== undefined) {
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/${script}/?format=json`, {
              method: "OPTIONS",
            });
            const jsonData = await response.json();
            setOptions((prevState) => ({
               ...prevState, [script]: jsonData.actions.POST
            }));
            // console.log(jsonData.actions.POST);
            return jsonData.actions.POST;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      };

    // TODO options jutusta haettava labelit ja muuttujien tietoja muita jos haluaa
    // miten tämä tehdään? oma funkkari jolla luodaan muuttujat? 

    return (
        <>
           <h2>Searches</h2>
           {searches.searches ? (
                <div>
                    {Object.keys(searches.searches).map((key, index) => {
                        return (
                            <div>
                                <h3>{key} - {index}</h3>
                                {JSON.stringify(searches.searches[key].saved_searches)}
                                
                                {Object.values(searches.searches[key].saved_searches).map(search => {
                                    return (
                                        <div>
                                            <ul>
                                                <li>Search ID : {search.id}</li>
                                                <li>Search title: {search.title}</li>
                                                <li>Search date: {search.create_datetime}</li>
                                                <li></li>
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}

                    <p>JSON auki</p>
                    {JSON.stringify(options)}
                </div>
            ) : (
                <p>No searches</p>   
            )}
        </>
    );
};

export default SearchListComponent;