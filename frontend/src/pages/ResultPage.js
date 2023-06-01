import React from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
    const { search_id } = useParams();

    return (
        <div class="bg-white p-8 box">
            <h1 class="text-3xl font-extrabold dark:text-white">Results page</h1>
            <br></br>
            <p>TODO searhin tiedot ja tyypin mukainen datan esitys</p>
            <br></br>
            <p>ID: {search_id}</p>
        </div>
    );
};

export default ResultPage;