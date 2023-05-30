import React from 'react';
import DynamicFormComponent from '../components/dynamicSearchForm'
import SearchList from '../components/SearchList'

const SearchPage = () => {
  return (
    <div>
      <h2>Search Page</h2>
      <p>Create a new search by selecting a script. TODO siirrä Contextiin jotta näkyy kun tehty tai lisää kun palautuu.</p>
      <DynamicFormComponent />
      <SearchList />
    </div>
  );
};

export default SearchPage;
