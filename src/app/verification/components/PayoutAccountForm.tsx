import InputFieldGroup from "@/app/component/InputFieldGroup";
import React from "react";
import BankDropdown from "./BankDropdown";

interface PayoutAccountFormProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const PayoutAccountForm: React.FC<PayoutAccountFormProps> = ({
  formData,
  handleChange,
}) => {
  const handleBankChange = (bank: string | null) => {
    const event = {
      target: {
        name: "bank",
        value: bank ? bank.toString() : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    formData.bank_swift = bank;
    handleChange(event);
  };

  return (
    <div className="border-b pb-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Payout Account Information
      </h2>

      {/* Account */}
      <div className="mt-4 flex gap-4">
        <div className="w-1/3">
          <InputFieldGroup
            fields={[{ label: "Account Name", name: "account_name" }]}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
        <div className="w-1/3">
          <InputFieldGroup
            fields={[{ label: "Account Number", name: "account_number" }]}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
        <div className="w-1/3">
          <BankDropdown
            value={formData.bank ? formData.bank : null}
            onChange={handleBankChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PayoutAccountForm;
