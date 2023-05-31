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
                // console.log(postData);
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
            <br></br>
           <h2 class="text-2xl font-extrabold dark:text-white">Searches</h2>
           {searches.searches && options ? (
                <div>
                    {Object.keys(searches.searches).map((searchname, index2) => {
                        return (
                            <div key={searchname}>
                                <h3 class="text-1xl mb-2 font-extrabold dark:text-white" key={`${index2}_${searchname}`}>{searchname}</h3>
                                { /* JSON.stringify(searches.searches[searchname].saved_searches) */ }
                                
                                {Object.values(searches.searches[searchname].saved_searches).map(search => {
                                    let has_searchevent = false;
                                    if (search.has_searchevent === true) has_searchevent = true;
                                    return (
                                        <div class="max-w-sm p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={search.id+"_"+search.title}>
                                            <ul role="list" class="divide-y divide-gray-100" key={searchname+"_"+search.id}>
                                                { /* console.log("avain2 "+searchname) */ }
                                                { /* console.log((options[searchname])) */}

                                                {Object.entries(options).map(([key, value]) => {
                                                    if(searchname === key) 
                                                        return (
                                                            <div key={searchname+"_"+key}>
                                                                {value.map(([prop, propData], index) => (
                                                                    <li name="property" key={key+"_"+index+"_"+prop} id={index+"_"+prop} class="flex py-1">
                                                                        {propData.label} : {search[prop]}
                                                                    </li>
                                                                ))}
                                                            </div>
                                                        )
                                                    else return ( <> </> )
                                                })}
                                               
                                            </ul>
                                            <br></br>
                                            <button onClick={() => runSearch(search.id)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Start search</button>
                                            {has_searchevent ? (
                                                <button onClick={() => console.log(search.id)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">There are results</button>
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