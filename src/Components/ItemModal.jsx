import React from 'react';

function ItemModal({ isOpen, onClose, onSubmit, formData, onInputChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Create New Item</h2>
        <form onSubmit={onSubmit}>
          <input
            name="itemNo"
            type="number"
            value={formData.itemNo}
            onChange={onInputChange}
            placeholder="Item No"
            className="w-full mb-3 p-2 border rounded"
            required
          />
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
            name="unitPrice"
            type="number"
            value={formData.unitPrice}
            onChange={onInputChange}
            placeholder="Unit Price"
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={onInputChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
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
