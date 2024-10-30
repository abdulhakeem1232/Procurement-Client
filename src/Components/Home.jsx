import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Zebronet Procurement App</h1>
      <p className="text-lg mb-6">
        Your one-stop solution for managing suppliers, items, and orders efficiently.
      </p>
      <p className="text-md mb-4">
        Explore our features to streamline your procurement process:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Manage Suppliers</li>
        <li>Add and Order Items</li>
        <li>Create and View Orders</li>
        <li>Export Data to Excel and PDF</li>
      </ul>
      <p className="text-md">
        Get started by navigating through the menu above!
      </p>
    </div>
  );
}

export default Home;
