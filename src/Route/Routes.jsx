import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import SuppliersPage from '../Pages/SuppliersPage';
import ItemsPage from '../Pages/ItemsPage';




const AllRoutes = () => {
    
  return (
    <Routes>
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/items" element={<ItemsPage />} />

    </Routes>
  );
};

export default AllRoutes;
