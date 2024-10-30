import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../Services/endpoints';

function CreateOrder() {
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [supplierId, setSupplierId] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(endpoints.getAllItems);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(endpoints.getActiveSupplier);
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i.itemId === item._id);
      if (existingItem) return prev; // Avoid duplicates

      return [
        ...prev,
        {
          itemId: item._id,
          itemName: item.itemName,
          quantity: 1, // Default quantity
          unitPrice: item.unitPrice,
          packingUnit: item.stockUnit, // Auto-set packing unit from stock unit
        },
      ];
    });
  };

  const handleQuantityChange = (e, itemId) => {
    const quantity = parseInt(e.target.value, 10) || 1;
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleSubmitOrder = async () => {
    if (!supplierId) {
      alert('Please select a supplier.');
      return;
    }
    try {
      const orderData = {
        supplierId,
        items: selectedItems.map((item) => ({
          itemNo: item.itemId,
          orderQty: item.quantity,
          packingUnit: item.packingUnit,
        })),
      };
      const response = await axios.post(endpoints.createOrder, orderData);
      console.log('Order created:', response.data);
      alert('Order placed successfully!');
      setSelectedItems([]);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Order</h2>
      <div className="mb-4">
        <label htmlFor="supplierId" className="block text-gray-600 mb-2">Select Supplier</label>
        <select
          id="supplierId"
          className="border rounded p-2 w-full"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
        >
          <option value="">Select a supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.supplierName}
            </option>
          ))}
        </select>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Items to Order</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 bg-white shadow-sm">
            <h4 className="text-lg font-bold text-gray-700">{item.itemName}</h4>
            <p className="text-gray-500">Category: {item.category}</p>
            <p className="text-gray-500">Unit Price: ${item.unitPrice}</p>
            <p className="text-gray-500">Packing Unit: {item.stockUnit}</p>
            <button
              onClick={() => handleSelectItem(item)}
              className="bg-blue-500 text-white mt-2 py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Order Summary</h3>
      {selectedItems.length > 0 ? (
        <table className="w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">Item Name</th>
              <th className="px-6 py-3 text-left text-gray-600">Quantity</th>
              <th className="px-6 py-3 text-left text-gray-600">Unit Price</th>
              <th className="px-6 py-3 text-left text-gray-600">Packing Unit</th>
              <th className="px-6 py-3 text-left text-gray-600">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item.itemId}>
                <td className="px-6 py-4">{item.itemName}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.itemId)}
                    className="border rounded p-2 w-16"
                  />
                </td>
                <td className="px-6 py-4">${item.unitPrice}</td>
                <td className="px-6 py-4">{item.packingUnit}</td>
                <td className="px-6 py-4">${(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No items selected.</p>
      )}

      <button
        onClick={handleSubmitOrder}
        className="bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Submit Order
      </button>
    </div>
  );
}

export default CreateOrder;
