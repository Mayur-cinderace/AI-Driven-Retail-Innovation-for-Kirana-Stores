// src/app/customer/page.tsx
"use client";

import React from "react";
import CustomerDashboard from "./CustomerDashboard";

const dummyCustomers = [
  { id: "1", name: "Ram" },
  { id: "2", name: "Sita" },
  { id: "3", name: "Lakshman" },
];

const handlePurchaseSubmit = (data: {
  customerId: string;
  amount: number;
  category: string;
  useWallet: boolean;
}) => {
  console.log("Submitted Purchase:", data);
  // You can replace this with an actual API call to save purchase
};

const CustomerPage = () => {
  return (
    <CustomerDashboard
      customers={dummyCustomers}
      onSubmit={handlePurchaseSubmit}
    />
  );
};

export default CustomerPage;
