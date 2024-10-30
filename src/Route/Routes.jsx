import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import SuppliersPage from '../Pages/SuppliersPage';
import ItemsPage from '../Pages/ItemsPage';
import CreateOrderpage from '../Pages/CreateOrderpage';
import OrderListPage from '../Pages/OrderListPage';




const AllRoutes = () => {
    
  return (
    <Routes>
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/createOrder" element={<CreateOrderpage />} />
      <Route path="/orderlist" element={<OrderListPage />} />
    </Routes>
  );
};

export default AllRoutes;
