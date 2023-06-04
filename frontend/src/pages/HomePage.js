import React from 'react';

const HomePage = () => {
  return (
    <section>
      <div>
        <div class="bg-gray-40 p-8 box">
          <h1 class="text-3xl font-extrabold dark:text-white">Home Page</h1>
          <br></br>
          <p>This is a weird search system for a coding demo. </p>
          <p>It mixes different things in weird way in order to show some know how. It has no other purpose.</p>
          <br></br>
          <h2 class="text-md font-semibold leading-6 text-gray-900">Tools used:</h2>
          <br></br>
          <ul role="list" class="divide-y divide-gray-100">
            <li class="flex py-1">Django - backend</li>
            <li class="flex py-1">React - frontend</li>            
            <li class="flex py-1">Selenium for web scraping</li>
            <li class="flex py-1">Docker and docker compose to run things for demo purposes</li>
            <li class="flex py-1">ChatGPT 3.5 for speedy development and ideas</li>
            <li class="flex py-1">TODO Celery for tasks</li>
            <li class="flex py-1">TODO Context or redux </li>
            <li class="flex py-1">TODO Java as and event sourcing service</li>
            <li class="flex py-1">TODO EventStoreDB</li>
            <li class="flex py-1">TODO xstate for frontend</li>
        
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
