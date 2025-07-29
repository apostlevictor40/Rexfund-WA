import React, { useState } from 'react';

const Dashboard = () => {
  const [wallet, setWallet] = useState(5000);
  const [referralBonus, setReferralBonus] = useState(500);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (amount >= 2000 && amount <= wallet) {
      setWallet(wallet - amount);
      alert('Withdrawal request submitted. Processing...');
      setWithdrawAmount('');
    } else {
      alert('Enter a valid amount (min ₦2000)');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
      <p className="mb-6">Welcome to your investment panel</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-2xl shadow">
          <h3 className="font-semibold text-lg">Wallet Balance</h3>
          <p className="text-2xl font-bold">₦{wallet}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-2xl shadow">
          <h3 className="font-semibold text-lg">Referral Bonus</h3>
          <p className="text-2xl font-bold">₦{referralBonus}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">₦2,000 Plan</h3>
          <p>Earn ₦3,200 in 1 day</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">₦3,000 Plan</h3>
          <p>Earn ₦4,800 in 2 days</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">₦4,000 Plan</h3>
          <p>Earn ₦6,400 in 3 days</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">₦10,000 Plan</h3>
          <p>Earn ₦16,000 in 1 day</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">₦50,000 Plan</h3>
          <p>Earn ₦80,000 in 2 days</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">₦100,000 Plan</h3>
          <p>Earn ₦160,000 in 3 days</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">Withdraw Funds</h3>
        <input
          type="number"
          placeholder="Enter amount (min ₦2000)"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleWithdraw}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Submit Withdrawal
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
