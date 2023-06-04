import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LineChartComponent from './LineChartComponent';


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
    // also fix datetimes format here or in backend

    return (
        <>
            <br />
            <div>
                <h3 class="text-1xl mb-2 font-extrabold dark:text-white">Search info for continuous search:</h3>
                <ul class="divide-y divide-gray-100">
                    {Object.entries(search).map(([prop, propData], index) => {
                        if(prop !== "search_ptr" && prop !== "script") {
                            return ( 
                                <li key={index+"_"+prop} class="flex py-1">{propData}</li>
                            )
                        }
                    })}
                </ul>
            </div>
            <br />
            <LineChartComponent stateData={resultEvents} />
            <h3 class="text-1xl mb-2 font-extrabold dark:text-white">Data:</h3> <hr />
            {resultEvents.map((event) => {
                const formattedDatetime = new Date(event.created_datetime).toLocaleString();
                return ( 
                    <>
                        <div key={event.id}>
                            Searched: {formattedDatetime}
                            <ul key={event.id+"_ul"} class="divide-y divide-gray-100">
                                {typeof event.data === 'string' ? (
                                <li key="none" class="flex py-1">
                                    <h3 class="text-1xl mb-2 font-extrabold dark:text-white">Data:</h3> {event.data}
                                </li>
                                ) : (
                                    Object.entries(event.data).map(([key, value]) => (
                                        <li key={key+"_"+event.id} class="flex py-1">
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
           
        </>
    )
};

export default ResultEvents;

/* 
{JSON.stringify(resultEvents)}
<p>JSON auki search</p>
{JSON.stringify(search)}
*/