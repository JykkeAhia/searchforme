import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DynamicFormComponent = () => {
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectOptions, setSelectOptions] = useState([]);
  const [script, setScript] = useState('');

  useEffect(() => {
    fetchScriptOptions();
    // fetchOptions();
  }, []);

  const fetchScriptOptions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/searches/');
      setSelectOptions(Object.entries(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOptions = async (script) => {
    if (script !== undefined) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/${script}/?format=json`, {
          method: "OPTIONS",
        });
        const jsonData = await response.json();
        const jsonDataArray = Object.entries(jsonData.actions.POST);
        console.info(jsonData.actions.POST);
        setOptions(jsonDataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleScriptChange = (event) => {
    const { name, value } = event.target;
    if (value === "") return;
    setScript(value);
    console.info("script value changed named: "+name+" value: "+value);
    handleChange(event);
    fetchOptions(value);
    // TODO when script is changed should we clear the formData?
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
    // POST to http://127.0.0.1:8000/api/searchcarprice/ or similar depending on the script used
    console.info(formData);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/${script}/`, formData);
      console.log(response.data); 
      // TODO if ok should we focus on the new search running options??
      // or clear the form since searches are immutable
    } catch (error) {
      console.error(error);
      // TODO display errors in the form or somewhere
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        {/* Example select field */}
        <label key="script" htmlFor="script">Script :</label>
        <select key="scriptselect" name="script" value={formData.script || ''} onChange={handleScriptChange} class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"> 
          <option key="optiondefault" value="">Select a search script</option>
          {selectOptions.map((option) => (
            <option key={option[0]} value={option[0]}>
              {option[1]}
            </option>
          ))}
        </select>
      </div>
      {options ? (
        <div>
          {options.map(option => {
            // console.log(option[0]);
            // console.log(option[1].type);
            console.log(typeof options);
            // todo required true from options data
            if (option[1].type === 'string' && option[1].label !== 'Script') {
              return (
                <div key={option[0]}>
                  <label htmlFor={option[0]}>{option[1].label} :</label>
                  <input key={option[1].label} type="text" id={option[0]} name={option[0]} onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              );
            } else if (option[1].type === 'integer' && option[1].label !== 'ID') {
              return (
                <div key={option[0]}>
                  <label htmlFor={option[0]}>{option[1].label} :</label>
                  <input key={option[1].label} type="integer" id={option[0]} name={option[0]} onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              );
            }
            // Handle other parameter types (e.g., checkbox, radio, etc.) as needed
            return null;
          })}
          {options.length > 0 ? ( 
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create a new search</button>
          ) : ( <p></p> )
          } 
        </div>
      ) : (
        <p>Select a search script</p>  
      )}
    </form>
  );
};

export default DynamicFormComponent;
