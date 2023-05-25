import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DynamicFormComponent = () => {
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/searchcarprice/?format=json', {
        method: "OPTIONS",
      });
      const jsonData = await response.json();
      const jsonDataArray = Object.entries(jsonData.actions.POST);
      console.info(jsonData.actions.POST);
      setOptions(jsonDataArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // console.info(formData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // TODO validate by options in form or here
    // Send form data to Django REST Framework endpoint
    // POST to http://127.0.0.1:8000/api/searchcarprice/
    console.info(formData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/searchcarprice/', formData);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {options ? (
        <div>
        {options.map(option => {
          // console.log(option[0]);
          // console.log(option[1].type);
          
          // todo required true
          if (option[1].type === 'string') {
            return (
              <div key={option[0]}>
                <label htmlFor={option[0]}>{option[1].label}</label>
                <input key={option[1].label} type="text" id={option[0]} name={option[0]} onChange={handleChange} />
              </div>
            );
          } else if (option[1].type === 'integer' && option[1].label !== 'ID') {
            return (
              <div key={option[0]}>
                <label htmlFor={option[0]}>{option[1].label}</label>
                <input key={option[1].label} type="integer" id={option[0]} name={option[0]} onChange={handleChange} />
              </div>
            );
          }
          // Handle other parameter types (e.g., checkbox, radio, etc.) as needed
          return null;
        })}
        </div>
      ) : (
        <p>Loading data...</p>  
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicFormComponent;
