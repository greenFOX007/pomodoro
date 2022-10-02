import React from 'react';

import './App.css';
import { Header } from './components/Headet';
import { Layout } from './components/Layout';
import { Mainpage } from './components/MainPage/Mainpage';

function App() {
  return (
    <div>
       <Header/>
       <Layout>
          <Mainpage/>
       </Layout>
    </div>
    
 
  );
}

export default App;
