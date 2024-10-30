import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import ExcelJS from 'exceljs';
import axios from 'axios';
import { endpoints } from '../Services/endpoints';

const ListOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(endpoints.getAllOrders);
        console.log(response, 'Fetched Orders');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const generatePDF = (order) => {
    const doc = new jsPDF();
    doc.text(`Order ID: ${order._id}`, 10, 10);
    doc.text(`Order NO: ${order.orderNo}`, 10, 20);
    doc.text(`Supplier: ${order.supplier}`, 10, 30);
    doc.text(`Total Amount: $${order.itemTotal}`, 10, 40);
    doc.text(`Order Date: ${new Date(order.orderDate).toLocaleString()}`, 10, 50);

    doc.save(`order-${order._id}.pdf`);
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    worksheet.columns = [
      { header: 'Order ID', key: '_id', width: 20 },
      { header: 'Order NO', key: 'orderNo', width: 25 },
      { header: 'Supplier', key: 'supplier', width: 25 },
      { header: 'Item Total', key: 'itemTotal', width: 15 },
      { header: 'Net Amount', key: 'netAmount', width: 15 },
      { header: 'Order Date', key: 'orderDate', width: 25 },
    ];

    orders.forEach((order) => {
      worksheet.addRow({
        _id: order._id,
        orderNo: order.orderNo,
        supplier: order.supplier,
        itemTotal: order.itemTotal,
        netAmount: order.netAmount,
        orderDate: new Date(order.orderDate).toLocaleString(),
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Order NO</th>
            <th className="py-2 px-4 border-b">Item Total</th>
            <th className="py-2 px-4 border-b">Net Amount</th>
            <th className="py-2 px-4 border-b">Order Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">{order.orderNo}</td>
              <td className="py-2 px-4 border-b">${order.itemTotal}</td>
              <td className="py-2 px-4 border-b">${order.netAmount}</td>
              <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => generatePDF(order)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={exportToExcel}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default ListOrder;
