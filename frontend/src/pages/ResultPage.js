import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResultOnce from '../components/ResultOnce'
import ResultEvents from '../components/ResultEvents'

const ResultPage = () => {
    const { search_type, search_id } = useParams();
   /* const [searchOptions, setSearchOptions] = useState([]);

    useEffect(() => {
        fetchSearchOptions();
    }, []);

    const fetchSearchOptions = async (script) => {
        if (script !== undefined) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/${script}/?format=json`, {
                    method: "OPTIONS",
                });
                const jsonData = await response.json();
                const jsonDataArray = Object.entries(jsonData.actions.POST);
                console.info(jsonData.actions.POST);
                setSearchOptions(jsonDataArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
    */

    return (
        <div class="bg-white p-8 box">
            <h1 class="text-3xl font-extrabold dark:text-white">Results page</h1>
            <br></br>
            <p>Toistuvasti haettua dataa esitetään ajanmukaan graafina / jos vain yksittäinen haku esitetään ilman graafia. </p>
            <p>TODO useamman eri Searchin datat samaan ja korrelaatioita etsimään</p>
            {(search_type === 'one_time') ? 
                (<ResultOnce search_id={search_id}/>) : 
                (<ResultEvents search_id={search_id}/>)
            }
        </div>
    );
};

export default ResultPage;