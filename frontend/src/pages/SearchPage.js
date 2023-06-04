import React, { useState } from 'react';
import DynamicFormComponent from '../components/dynamicSearchForm'
import SearchList from '../components/SearchList'

const SearchPage = () => {
  const [reloadFlag, setReloadFlag] = useState(false);

  const updateSearchList = () => {
    // console.log("Update search List");
    setReloadFlag(!reloadFlag);
  }
  
  return (
    <div>
      <div class="bg-white p-8 box">
        <h1 class="text-3xl font-extrabold dark:text-white">Search Page</h1>
        <br></br>
        <p>Create a new search by selecting a script.</p>
        <br></br>
        <DynamicFormComponent updateSearchList={updateSearchList} />
        <SearchList  reload={reloadFlag} />
      </div>
    </div>
  );
};

export default SearchPage;
