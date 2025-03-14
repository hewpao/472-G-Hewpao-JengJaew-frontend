import { useGetAllBanks } from "@/api/verification/useBank";
import React, { useState, useEffect } from "react";

interface BankDropdownProps {
  value: string | null;
  onChange: (bankCode: string | null) => void;
}

const BankDropdown: React.FC<BankDropdownProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const { data: banks, isLoading } = useGetAllBanks();

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const bankCode = event.target.value || null;
    onChange(bankCode);
  };

  if (isLoading) {
    return <div>Loading banks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor="bank">
        เลือกธนาคาร
      </label>
      <select
        id="bank"
        value={value || ""}
        onChange={handleBankChange}
        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
      >
        <option value="">-- เลือกธนาคาร --</option>
        {banks?.banks.map((bank) => (
          <option key={bank.SwiftCode} value={bank.SwiftCode}>
            {bank.NameEN}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BankDropdown;
