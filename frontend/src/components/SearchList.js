import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchListComponent = () => {
    const [searches, setSearches] = useState({});
    const [options, setOptions] = useState({
        searchcarprice: {
            id: {
              type: 'integer',
              required: false,
              read_only: true,
              label: 'ID'
            },
            title: {
              type: 'string',
              required: true,
              read_only: false,
              label: 'Title',
              max_length: 120
            },
            create_datetime: {
              type: 'datetime',
              required: false,
              read_only: true,
              label: 'Create datetime'
            },
            script: {
              type: 'string',
              required: true,
              read_only: false,
              label: 'Script',
              max_length: 24
            },
            parameter_model: {
              type: 'string',
              required: true,
              read_only: false,
              label: 'Parameter model',
              max_length: 256
            },
            parameter_make: {
              type: 'string',
              required: true,
              read_only: false,
              label: 'Parameter make',
              max_length: 256
            }
          },
          searchwebshop: {
            id: {
              type: 'integer',
              required: false,
              read_only: true,
              label: 'ID'
            },
            title: {
              type: 'string',
              required: true,
              read_only: false,
              label: 'Title',
              max_length: 120
            },
            create_datetime: {
              type: 'datetime',
              required: false,
              read_only: true,
              label: 'Create datetime'
            },
            script: {
              type: 'string',
              required: true,
              read_only: false,
              label: 'Script',
              max_length: 24
            },
            search_string: {
              type: 'string',
              required: true,
              read_only: false,
              label: 'Search string',
              max_length: 256
            },
            search_max_price: {
              type: 'integer',
              required: true,
              read_only: false,
              label: 'Search max price'
            }
          }
    }); // TODO tää tieto pitäisi olla Contextissa tai muussa globaalissa tilassa tms. 
    // TODO lisäksi ei lataudu tarpeeksi ajoissa eli pitäisi varmaan tehdä alussa myös tämän haku

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
                ...prevState, [script]: jsonData.actions.POST // TODO niin helpottuu Object.entries(jsonData.actions.POST);
            }));
            // console.log(jsonData.actions.POST);
            return jsonData.actions.POST;
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        }
    };
        
    const runSearch = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/runsearch/?search_id=${id}`);
            // setSearches({searches: response.data});
            console.log(response.data);
            // TODO xstatelle tässä viesti, että search for search id on päällä
        } catch (error) {
            console.error(error);
            // TODO search id on errorissa ja error viesti
        } 
    };

    // TODO 1. muuta options taulukoksi?? niin se toimii nätimmin
    // TODO 2. mihin search tulokset varmaan oma sivu??

    return (
        <>
           <h2>Searches</h2>
           {searches.searches && options ? (
                <div>
                    {Object.keys(searches.searches).map((key, index) => {
                        return (
                            <div>
                                <h3 key={index}>{key}</h3>
                                { JSON.stringify(searches.searches[key].saved_searches) }
                                
                                {Object.values(searches.searches[key].saved_searches).map(search => {
                                    let has_searchevent = false;
                                    if (search.has_searchevent === true) has_searchevent = true;
                                    return (
                                        <div>
                                            <ul>
                                                <li key={search.id}>TODO poista Search ID : {search.id}</li>
                                                <li key={search.script}>TODO tääkin vois tulla suoraan Script: {search.script}</li>
                                                {Object.keys(options[key]).map((searchParameter, index2) => {
                                                    if(searchParameter !== 'id' && searchParameter !== 'script' && searchParameter !== 'has_searchevent') {
                                                        return (
                                                          <li key={searchParameter+"_"+index2}>{Object.values(options[key][searchParameter].label)} : {search[searchParameter]}</li>
                                                        )
                                                    } 
                                                    return ( <></> )
                                                })}
                                            </ul>
                                            <button onClick={() => runSearch(search.id)}>Start search</button>
                                            {has_searchevent ? (
                                                <button onClick={() => console.log(search.id)}>There are results</button>
                                            ) : ( 
                                                <p>No results yet.</p>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}

                    <p>JSON auki</p>
                    {JSON.stringify(options)}
                    {Object.values(options).map((option) => {
                        return (
                            <div>{option.id.type}</div>
                        )
                    })}
                </div>
            ) : (
                <p>No searches</p>   
            )}
        </>
    );
};

export default SearchListComponent;