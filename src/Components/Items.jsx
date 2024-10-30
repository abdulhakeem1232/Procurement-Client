import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../Services/endpoints';
import ItemModal from './ItemModal';

function Items() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    itemName: '',
    inventoryLocation: '',
    brand: '',
    category: '',
    supplier: '',
    stockUnit: 'Piece',
    unitPrice: '',
    itemImages: [],
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoints.getAllItems);
        console.log(response.data);
        
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      itemImages: e.target.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === 'itemImages') {
        for (let file of formData[key]) {
          data.append('itemImages', file);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(endpoints.createItems, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
      
      setItems((prevItems) => [...prevItems, response.data.item]);
      setShowModal(false);
      setFormData({
        itemName: '',
        inventoryLocation: '',
        brand: '',
        category: '',
        supplier: '',
        stockUnit: 'Piece',
        unitPrice: '',
        itemImages: [],
      });
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Items</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Create New Item
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading items...</p>
        ) : items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-sm">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Item Name</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Inventory Location</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock Unit</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Images</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.inventoryLocation}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.supplier?.supplierName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.stockUnit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.unitPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.itemImages && item.itemImages.length > 0 ? (
                        item.itemImages.map((img, index) => (
                          <img key={index} src={img} alt={`Item ${index}`} className="w-10 h-10 rounded" />
                        ))
                      ) : (
                        <p>No Images</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No items found.</p>
        )}
      </div>

      <ItemModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
      />
    </div>
  );
}

export default Items;
