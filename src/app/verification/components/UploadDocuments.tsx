import React from "react";
import ImageUpload from "../../component/ImageUpload";

interface UploadDocumentsProps {
  formData: any;
  handleImagesChange: (newImages: File[]) => void;
}

const UploadDocuments: React.FC<UploadDocumentsProps> = ({ formData, handleImagesChange }) => {
  return (
    <div className="border-b pb-4">
      <h2 className="text-lg font-semibold text-gray-800">Upload Documents</h2>
      <ImageUpload maxImages={2} images={formData.idDocuments} onImagesChange={handleImagesChange} />
      <p className="text-sm text-gray-600">Please upload a photo of your ID card or passport.</p>
    </div>
  );
};

export default UploadDocuments;
