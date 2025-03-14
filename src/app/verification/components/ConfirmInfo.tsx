import React from "react";
import { IdentityVerification } from "@/interfaces/IdentityVerification";

interface ConfirmInfoProps {
  formData: IdentityVerification;
  handleBackStep: () => void;
  handleNextStep: () => void;
}

const ConfirmInfo: React.FC<ConfirmInfoProps> = ({
  formData,
  handleBackStep,
  handleNextStep,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800">
        Confirm Your Information
      </h2>
      <p>
        <strong>Payout Account Number:</strong> {formData.account_number} (
        {formData.bank_swift}){" "}
      </p>
      <p>
        <strong>Payout Account Name:</strong> {formData.account_name}{" "}
      </p>
      <p>
        <strong>Uploaded Documents:</strong> {formData.idDocuments.length}{" "}
        file(s)
      </p>
    </div>
  );
};

export default ConfirmInfo;
