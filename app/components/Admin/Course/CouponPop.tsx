'use client'

import React, { useState } from "react";

type Props = {
  onSubmit: (couponData: {
    code: string;
    validity: string;
    discount: number;
    maxAllowed: number;
  }) => void;
  onClose: () => void;
};

const CouponPop = ({ onSubmit, onClose }: Props) => {
  const [code, setCode] = useState("");
  const [validity, setValidity] = useState("");
  const [discount, setDiscount] = useState(0);
  const [maxAllowed, setMaxAllowed] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ code, validity, discount, maxAllowed });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Generate a Coupon</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium">
              Coupon Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter coupon code"
              required
            />
          </div>

          <div>
            <label htmlFor="validity" className="block text-sm font-medium">
              Validity (YYYY-MM-DD)
            </label>
            <input
              type="date"
              id="validity"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="discount" className="block text-sm font-medium">
              Discount (%) 
            </label>
            <input
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              min={0}
              max={100}
              required
            />
          </div>

          <div>
            <label htmlFor="maxAllowed" className="block text-sm font-medium">
              Maximum Allowed
            </label>
            <input
              type="number"
              id="maxAllowed"
              value={maxAllowed}
              onChange={(e) => setMaxAllowed(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              min={1}
              required
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg focus:ring-2 focus:ring-red-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponPop;
