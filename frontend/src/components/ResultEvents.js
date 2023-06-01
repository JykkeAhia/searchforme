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

    // TODO also show some Search info like used parameters and name etc
    // TODO and show them on the chart

    return (
        <>
            <div>
                <br />
                <div>
                    <strong>Search info:</strong>
                    <ul>
                        {Object.entries(search).map(([prop, propData], index) => {
                            return ( 
                                <li key={index+"_"+prop}>{prop} : {propData}</li>
                            )
                        })}
                    </ul>
                </div>
                <br />
                <hr />
                <strong>Data:</strong> <hr />
                {resultEvents.map((event) => {
                    return ( 
                        <>
                            <div>
                                <ul>
                                    {typeof event.data === 'string' ? (
                                    <li>
                                        <strong>Data:</strong> {event.data}
                                    </li>
                                    ) : (
                                        Object.entries(event.data).map(([key, value]) => (
                                            <li key={key}>
                                            <strong>{key}: </strong> {value} - created: {event.created_datetime}
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
            </div>
        </>
    )
};

export default ResultEvents;

// {JSON.stringify(resultEvents)}