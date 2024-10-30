import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../Services/endpoints';

function ItemModal({ isOpen, onClose, onSubmit, formData, onInputChange, onFileChange }) {
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchSuppliers = async () => {
        try {
          const response = await axios.get(endpoints.getActiveSupplier);
          console.log(response);
          
          setSuppliers(response.data.suppliers);
        } catch (error) {
          console.error('Error fetching suppliers:', error);
        } finally {
          setLoadingSuppliers(false);
        }
      };
      fetchSuppliers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Create New Item</h2>
        <form onSubmit={onSubmit}>
          <input
            name="itemName"
            type="text"
            value={formData.itemName}
            onChange={onInputChange}
            placeholder="Item Name"
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            name="inventoryLocation"
            type="text"
            value={formData.inventoryLocation}
            onChange={onInputChange}
            placeholder="Inventory Location"
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="brand"
            type="text"
            value={formData.brand}
            onChange={onInputChange}
            placeholder="Brand"
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={onInputChange}
            placeholder="Category"
            className="w-full mb-3 p-2 border rounded"
          />

          <select
            name="supplier"
            value={formData.supplier}
            onChange={onInputChange}
            className="w-full mb-3 p-2 border rounded"
            required
          >
            <option value="">Select Supplier</option>
            {loadingSuppliers ? (
              <option>Loading suppliers...</option>
            ) : (
              suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.supplierName}
                </option>
              ))
            )}
          </select>

          <select
            name="stockUnit"
            value={formData.stockUnit}
            onChange={onInputChange}
            className="w-full mb-3 p-2 border rounded"
            required
          >
            <option value="Piece">Piece</option>
            <option value="Kg">Kg</option>
            <option value="Liter">Liter</option>
          </select>

          <input
            name="unitPrice"
            type="number"
            value={formData.unitPrice}
            onChange={onInputChange}
            placeholder="Unit Price"
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <input
            name="itemImages"
            type="file"
            multiple
            onChange={onFileChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemModal;
