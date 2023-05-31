import React from 'react';
import DynamicFormComponent from '../components/dynamicSearchForm'
import SearchList from '../components/SearchList'

const SearchPage = () => {
  return (
    <div>
      <div class="bg-white p-8 box">
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Search Page</h1>
        <br></br>
        <p>Create a new search by selecting a script. TODO siirrä Contextiin jotta näkyy kun tehty tai lisää kun palautuu.</p>
        <br></br>
        <DynamicFormComponent />
        <SearchList />
      </div>
    </div>
  );
};

export default SearchPage;
