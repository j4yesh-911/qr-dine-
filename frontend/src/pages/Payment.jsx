import React, {useState} from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Payment(){
  const data = JSON.parse(localStorage.getItem('cart') || '{}');
  const token = localStorage.getItem('token');
  const nav = useNavigate();
  const [payQR, setPayQR] = useState(null);

  const placeOrder = async () => {
    try {
      const items = (data.items || []).map(i=>({ itemId: i._id, qty: i.qty }));
      const res = await API.post('/orders', { tableId: data.tableId, items }, { headers: { Authorization: `Bearer ${token}` }});
      // get order id and total
      const order = res.data;
      // generate UPI payload (front-end can show a generated QR)
      // We'll ask backend to return a UPI string using configured UPI_ID
      const upiRes = await API.post('/admin/generate-upi', { amount: order.total }, { headers: { Authorization: `Bearer ${token}` }});
      setPayQR(upiRes.data.upiString); // upiString = upi payload or QR data
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Payment</h2>
      <div className="mt-3">Table: {data.tableId}</div>
      <div className="mt-3">Items:</div>
      {(data.items||[]).map(i=>(
        <div key={i._id} className="flex justify-between">{i.name} x {i.qty} <span>₹{i.qty*i.price}</span></div>
      ))}
      <div className="mt-3">Total: ₹{(data.items||[]).reduce((s,i)=>s+i.qty*i.price,0)}</div>
      <button onClick={placeOrder} className="mt-3 bg-green-600 text-white px-3 py-1 rounded">Place Order & Generate Bill</button>

      {payQR && (
        <div className="mt-6">
          <h3>Scan to pay (UPI)</h3>
          {/* payQR is a string — you can render it with a QR library on frontend */}
          <pre className="bg-gray-100 p-3 rounded mt-2">{payQR}</pre>
        </div>
      )}
    </div>
  );
}
