import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ResultEvents = (props) => {
    const [resultEvents, setResultEvents] = useState([]);
    const [search, setSearch] = useState([]);
    
    useEffect(() => {
        fetchSearch();
        fetchResultEvents();
    }, []);

    const fetchSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getsearchbyid/${props.search_id}/`);
            console.log(response.data);
            setSearch(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchResultEvents = async () => {
        try {
            // const response = await axios.get(`http://127.0.0.1:8000/api/getevents/${props.search_id}`);
            const response = await axios.get(`http://127.0.0.1:8000/api/getevents/?search_id=${props.search_id}`);
            console.log(response.data);
            setResultEvents(response.data);
        } catch (error) {
            console.error(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made, but no response was received
                console.log(error.request);
              } else {
                // Something else happened while setting up the request
                console.log('Error', error.message);
              }
        }
    };

    // TODO show only part of search info
    // TODO and show data on the chart
    // also fix datetimes format here on in backend

    return (
        <>
            <br />
            <div>
                <h3 class="text-1xl mb-2 font-extrabold dark:text-white">Search info:</h3>
                <ul class="divide-y divide-gray-100">
                    {Object.entries(search).map(([prop, propData], index) => {
                        return ( 
                            <li key={index+"_"+prop} class="flex py-1">{prop} : {propData}</li>
                        )
                    })}
                </ul>
            </div>
            <br />
            <h3 class="text-1xl mb-2 font-extrabold dark:text-white">Data:</h3> <hr />
            {resultEvents.map((event) => {
                const formattedDatetime = new Date(event.created_datetime).toLocaleString();
                return ( 
                    <>
                        <div>
                            Created: {formattedDatetime}
                            <ul class="divide-y divide-gray-100">
                                {typeof event.data === 'string' ? (
                                <li class="flex py-1">
                                    <h3 class="text-1xl mb-2 font-extrabold dark:text-white">Data:</h3> {event.data}
                                </li>
                                ) : (
                                    Object.entries(event.data).map(([key, value]) => (
                                        <li key={key} class="flex py-1">
                                            {key} : {value}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                        <hr />   
                    </>
                )
            })}
            {JSON.stringify(resultEvents)}
            <p>JSON auki search</p>
            {JSON.stringify(search)}
        </>
    )
};

export default ResultEvents;

// {JSON.stringify(resultEvents)}