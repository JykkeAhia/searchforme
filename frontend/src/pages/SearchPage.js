import React from 'react';
import DynamicFormComponent from '../components/dynamicSearchForm'
import SearchList from '../components/SearchList'

const SearchPage = () => {
  return (
    <div>
      <h1>Search Page</h1>
      <DynamicFormComponent />
      <SearchList />
    </div>
  );
};

export default SearchPage;