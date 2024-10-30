import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/suppliers" className="text-white hover:text-gray-300">
            Suppliers
          </Link>
        </li>
        <li>
          <Link to="/items" className="text-white hover:text-gray-300">
            Items
          </Link>
        </li>
        <li>
          <Link to="/createOrder" className="text-white hover:text-gray-300">
            Create Order
          </Link>
        </li>
        <li>
          <Link to="/orderlist" className="text-white hover:text-gray-300">
            Order List
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
