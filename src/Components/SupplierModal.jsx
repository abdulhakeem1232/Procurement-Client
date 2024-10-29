import React,{useState} from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

function SupplierModal({ isOpen, onClose, onSubmit, formData, onInputChange }) {
    const [countryOptions] = useState(countryList().getData());

  const handleCountryChange = (selectedOption) => {
    onInputChange({ target: { name: 'country', value: selectedOption.label } });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Supplier Name</label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={onInputChange}
              required
              className="w-full border px-3 py-1 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onInputChange}
              required
              className="w-full border px-3 py-1 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">TAX No</label>
            <input
              type="text"
              name="taxNo"
              value={formData.taxNo}
              onChange={onInputChange}
              required
              className="w-full border px-3 py-1 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country</label>
           <Select
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Select Country"
            className="mb-4"
          />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={onInputChange}
              required
              pattern="^\d{10,15}$"
              className="w-full border px-3 py-1 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              className="w-full border px-3 py-1 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
            >
              Add Supplier
            </button>
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupplierModal;
