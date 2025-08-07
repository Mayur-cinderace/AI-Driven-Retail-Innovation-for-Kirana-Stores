"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Customer = {
  id: string;
  name: string;
};

type Props = {
  customers: Customer[];
  onSubmit: (data: {
    customerId: string;
    amount: number;
    category: string;
    useWallet: boolean;
  }) => void;
};

export default function CustomerDashboard({ customers, onSubmit }: Props) {
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [useWallet, setUseWallet] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerId,
      amount: parseFloat(amount),
      category,
      useWallet,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/60 shadow-2xl backdrop-blur-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          🛒 Customer Purchase
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Customer
            </label>
            <Select onValueChange={setCustomerId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((cust) => (
                  <SelectItem key={cust.id} value={cust.id}>
                    {cust.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grocery">Grocery</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="wallet"
              checked={useWallet}
              onCheckedChange={(checked) => setUseWallet(!!checked)}
            />
            <label htmlFor="wallet" className="text-sm">
              Use Wallet Balance
            </label>
          </div>

          <Button type="submit" className="w-full">
            Submit Purchase
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
