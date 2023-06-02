import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ResultOnce = (props) => {
    const [resultEvent, setResultEvent] = useState([]);
    useEffect(() => {
        fetchResultEvent();
    }, []);

    const fetchResultEvent = async () => {
        try {
            // const response = await axios.get(`http://127.0.0.1:8000/api/getevents/${props.search_id}`);
            const response = await axios.get(`http://127.0.0.1:8000/api/getevents/?search_id=${props.search_id}`);
            console.log(response.data);
            setResultEvent(response.data);
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
    
    // TODO also show some Search info like used parameters and name etc like in the events side
    
    return (
        <>
            <div>Search_id: {props.search_id}</div>
            {JSON.stringify(resultEvent)}
        </>
    )
};

export default ResultOnce;