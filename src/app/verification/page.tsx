"use client";
import { useState } from "react";
import ProgressIndicator from "../component/ProgressIndicator";
import ConfirmInfo from "./components/ConfirmInfo";
import PayoutAccountForm from "./components/PayoutAccountForm";
import UploadDocuments from "./components/UploadDocuments";
import { IdentityVerification } from "@/interfaces/IdentityVerification";
import {
  useVerifyWithKYC,
  useUpdateUserVerification,
  useGetVerificationStatus,
} from "@/api/verification/useVerification";
import { useSession } from "next-auth/react";
import { useAddTravelerPayoutAccount } from "@/api/verification/usePayoutAccount";
import { useRouter } from "next/navigation";

function Page() {
  const session = useSession();
  const { data: verified } = useUpdateUserVerification(
    session.data?.user?.email || "",
  );

  const addTravelerPayoutAccount = useAddTravelerPayoutAccount();
  const verifyWithKYC = useVerifyWithKYC();
  const router = useRouter();

  const [step, setStep] = useState(1);
  // const verificationSteps = ['Verification Started', 'Identity Checked', 'Verifying'];
  const verificationSteps = [
    "Upload Document",
    "Add Payout Account",
    "Verifying",
  ];

  const [formData, setFormData] = useState<IdentityVerification>({
    account_number: "",
    account_name: "",
    bank_swift: "",
    idDocuments: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImagesChange = (newImages: File[]) => {
    setFormData((prev) => ({ ...prev, idDocuments: newImages }));
  };

  const handleBackStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleNextStep = () => {
    if (step < 3) setStep((prev) => prev + 1);
    else {
      handleConfirm(); // เมื่อถึงขั้นสุดท้ายให้เรียกฟังก์ชันยืนยัน
      setStep((prev) => prev + 1); // ไปหน้าอื่น
    }
  };

  const handleConfirm = async () => {
    // ส่งข้อมูลไปยัง API
    // useUpdateUserVerification(session.data?.user?.email || "");

    await verifyWithKYC.mutateAsync(
      {
        "card-image": formData.idDocuments[0],
        provider: "iapp",
      },
      {
        onSuccess: () => {
          alert("Your identity is being verified!");
        },
        onError: () => {
          alert("Error verifying your identity!");
          return;
        },
      },
    );

    await addTravelerPayoutAccount.mutateAsync(
      {
        account_number: formData.account_number,
        account_name: formData.account_name,
        bank_swift: formData.bank_swift,
      },
      {
        onSuccess: () => {
          alert("PayoutAccount added successfully!");
        },
        onError: (error) => {
          alert(error);
        },
      },
    );
    if (verified?.isVerified) {
      alert("You have already verified!");
      return;
    }
    alert("Verification Complete! 🎉");
    router.push("/");
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white rounded-lg p-4">
        <ProgressIndicator step={step} steps={verificationSteps} />

        {step === 1 && (
          <UploadDocuments
            formData={formData}
            handleImagesChange={handleImagesChange}
          />
        )}
        {step === 2 && (
          <PayoutAccountForm formData={formData} handleChange={handleChange} />
        )}
        {step === 3 && (
          <ConfirmInfo
            formData={formData}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        )}
        {step < 4 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={handleBackStep}
              className={`px-4 py-2 rounded-lg ${step === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gray-400 text-white"}`}
              disabled={step === 1}
            >
              Back
            </button>

            <button
              onClick={handleNextStep}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              {step === 3 ? "Confirm" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
