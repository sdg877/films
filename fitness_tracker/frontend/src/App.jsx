import React from 'react';
import '.index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateActivity from "./pages/CreateActivity";
import ShowActivity from './pages/ShowActivity';
import EditActivity from './pages/EditActivity';
import DeleteActivity from './pages/DeleteActivity';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/activity/create' element={<CreateActivity />} />
        <Route path='/activity/details/:id' element={<ShowActivity />} />
        <Route path='/activity/edit/:id' element={<EditActivity />} />
        <Route path='/activity/delete/:id' element={<DeleteActivity />} />
      </Routes>
      
    </div>
  )
}

export default App
