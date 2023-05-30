import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchListComponent = () => {
    const [searches, setSearches] = useState({});
    const [options, setOptions] = useState([]);
   
    // TODO tää tieto pitäisi olla Contextissa tai muussa globaalissa tilassa tms. 
    // TODO lisäksi ei lataudu tarpeeksi ajoissa eli pitäisi varmaan tehdä alussa myös tämän haku

    useEffect(() => {
        fetchSearches();
    }, []);

    const fetchSearches = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/allsavedsearches/');
            setSearches({searches: response.data});
            // console.log(response.data);
            Object.keys(response.data).map(key => {
                console.log("avain :"+key);
                fetchOptions(key);
            });
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
                const postData = Object.entries(jsonData.actions.POST);
                setOptions((prevState) => ({
                    ...prevState, 
                    [script]: postData,
                }));
                console.log(postData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
        
    const runSearch = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/runsearch/?search_id=${id}`);
            // TODO setSearches({searches: response.data});
            console.log(response.data);
            // TODO xstatelle tässä viesti, että search for search id on päällä
        } catch (error) {
            console.error(error);
            // TODO search id on errorissa ja error viesti
        } 
    };

    return (
        <>
           <h2>Searches</h2>
           {searches.searches && options ? (
                <div>
                    {Object.keys(searches.searches).map((searchname, index) => {
                        return (
                            <div>
                                <h3 key={index}>{searchname}</h3>
                                { JSON.stringify(searches.searches[searchname].saved_searches) }
                                
                                {Object.values(searches.searches[searchname].saved_searches).map(search => {
                                    let has_searchevent = false;
                                    if (search.has_searchevent === true) has_searchevent = true;
                                    return (
                                        <div>
                                            <ul>
                                                {console.log("avain2 "+searchname)}
                                                {console.log((options[searchname]))}

                                                {Object.entries(options).map(([key, value]) => {
                                                    if(searchname === key) 
                                                        return (
                                                            <div>
                                                                {value.map(([prop, propData], index) => (
                                                                    <li name="property" id={index+"_"+prop}>
                                                                        {propData.label} : {search[prop]}
                                                                    </li>
                                                                ))}
                                                            </div>
                                                        )
                                                    else return ( <> </> )
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

                    <p>Searches auki</p>
                    {JSON.stringify(searches)}
                    <p>options json auki</p>
                    {JSON.stringify(options)}
                </div>
            ) : (
                <p>No searches</p>   
            )}
        </>
    );
};

export default SearchListComponent;