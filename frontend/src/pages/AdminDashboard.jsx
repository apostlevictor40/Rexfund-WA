import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState(120);
  const [totalInvestments, setTotalInvestments] = useState(350000);
  const [totalWithdrawals, setTotalWithdrawals] = useState(210000);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([
    {
      id: 1,
      name: 'Victor',
      amount: 5000,
      bank_code: '058', // GTBank code
      account_number: '0000000000',
    },
    {
      id: 2,
      name: 'Chika',
      amount: 3000,
      bank_code: '044', // Access Bank code
      account_number: '1111111111',
    },
  ]);

  const handleApprove = async (id) => {
    const withdrawal = pendingWithdrawals.find(w => w.id === id);

    try {
      const res = await axios.post(
        'https://api.paystack.co/transfer',
        {
          source: 'balance',
          amount: withdrawal.amount * 100,
          recipient: await createRecipient(withdrawal),
          reason: 'Withdrawal from Rexfunds',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.status) {
        setPendingWithdrawals(pendingWithdrawals.filter(w => w.id !== id));
        alert('Withdrawal approved and transfer successful!');
      } else {
        alert('Transfer failed: ' + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error processing transfer');
    }
  };

  const createRecipient = async (user) => {
    const response = await axios.post(
      'https://api.paystack.co/transferrecipient',
      {
        type: 'nuban',
        name: user.name,
        account_number: user.account_number,
        bank_code: user.bank_code,
        currency: 'NGN',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data.recipient_code;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{users}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Investments</h3>
          <p className="text-2xl font-bold">₦{totalInvestments}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Withdrawals</h3>
          <p className="text-2xl font-bold">₦{totalWithdrawals}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">Pending Withdrawals</h3>
        {pendingWithdrawals.length === 0 ? (
          <p className="text-gray-500">No pending withdrawals.</p>
        ) : (
          <ul>
            {pendingWithdrawals.map(w => (
              <li key={w.id} className="flex justify-between items-center border-b py-2">
                <span>{w.name} - ₦{w.amount}</span>
                <button
                  onClick={() => handleApprove(w.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve & Pay
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
