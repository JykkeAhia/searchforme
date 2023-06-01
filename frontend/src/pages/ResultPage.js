import React from 'react';
import { useParams } from 'react-router-dom';
import ResultOnce from '../components/ResultOnce'
import ResultEvents from '../components/ResultEvents'

const ResultPage = () => {
    const { search_type, search_id } = useParams();

    return (
        <div class="bg-white p-8 box">
            <h1 class="text-3xl font-extrabold dark:text-white">Results page</h1>
            <br></br>
            <p>Toistuvasti haettua dataa esitetään ajanmukaan graafina / jos vain yksittäinen haku esitetään ilman graafia. </p>
            <p>TODO useamman eri Searchin datat samaan. </p>
            {(search_type === 'one_time') ? 
                (<ResultOnce search_id={search_id}/>) : 
                (<ResultEvents search_id={search_id}/>)
            }
        </div>
    );
};

export default ResultPage;