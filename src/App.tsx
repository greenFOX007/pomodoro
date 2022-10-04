import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { Header } from './components/Headet';
import { Layout } from './components/Layout';
import { Mainpage } from './components/MainPage/Mainpage';
import { StatsPage } from './components/StatsPage/StatsPage';

function App() {
  return (
    <BrowserRouter>
    
      <Header/>
      <Layout>
        <Routes>
          <Route path="/" element={<Mainpage/>} />
          <Route path="/stats" element={<StatsPage/>}/>
        </Routes>
      </Layout>
      
   
     
      
      
    </BrowserRouter>  
 
  );
}

export default App;
