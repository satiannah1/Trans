import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Trans from './components/driver';
import Log from './components/login';
import Register from './components/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Trans />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Log />} />

      </Routes>
    </Router>
  );
}

export default App;
;

/*

import './App.css'
import Comp from './components/work.jsx'
 function App(){
  return(
   <div className='App'>
    
     <h1>hello this is me</h1>
     <p>hi,good to see u</p>
   </div>
  )
 }
 export default App;
 
 

import React, { useState } from 'react';
import Modal from './components/work.jsx'; // Ensure this path is correct

const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ModalExample;


import React from 'react';
import Loading from './components/work.jsx';
import './App.css'
const App = () => {
  return(
  <div>
    <Loading />
  </div>
  )
}

export default App;
*/
