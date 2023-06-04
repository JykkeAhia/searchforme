import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ResultPage from './pages/ResultPage';


function App() {
  return (
    <Router>
      <div class="relative -mt-[5.75rem] overflow-hidden pt-[5.75rem]">
        <div class="relative mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
          <header>
            <div class="flex flex-col">
              <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 p-3 lg:px-8">Search For Me</h1>
            
              <nav class="bg-gray-800">
                <div class="flex max-w-7xl items-center justify-between p-2 lg:px-8">
                  <div class="lg:flex lg:gap-x-12">
                    <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</Link>
                    <Link to="/search" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Search</Link>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        
          <div>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/result/:search_type/:search_id" element={<ResultPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
