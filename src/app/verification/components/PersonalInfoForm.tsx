import InputFieldGroup from "@/app/component/InputFieldGroup";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // นำเข้า CSS
import ProvinceDropdown from "./Province";
import DistrictsDropdown from "./Districts";
import SubdistrictsDropdown from "./Subdistricts";
import BankDropdown from "./BankDropdown";

interface PersonalInfoFormProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  handleChange,
}) => {
  const handleDateChange = (name: string, date: Date | null) => {
    const event = {
      target: {
        name,
        value: date ? date.toISOString() : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };

  const handleProvinceChange = (province: string | null) => {
    const event = {
      target: {
        name: "province",
        value: province ? province.toString() : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };

  const handleDistrictChange = (district: string | null) => {
    const event = {
      target: {
        name: "district",
        value: district ? district.toString() : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };

  const handleSubDistrictChange = (subdistrict: string | null) => {
    const event = {
      target: {
        name: "subdistrict",
        value: subdistrict ? subdistrict.toString() : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };

  const handleBankChange = (bank: string | null) => {
    const event = {
      target: {
        name: "bank",
        value: bank ? bank.toString() : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };

  const convertToBuddhistYear = (date: Date | null) => {
    if (!date) return null;
    const buddhistYear = date.getFullYear() + 543;
    return `${date.getDate()}/${date.getMonth() + 1}/${buddhistYear}`;
  };

  const convertToGregorianDate = (dateString: string) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year - 543, month - 1, day);
  };

  return (
    <div className="border-b pb-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Personal Information
      </h2>

      {/* ID Number */}
      <div className="mt-4 flex gap-4">
        <InputFieldGroup
          fields={[{ label: "ID Number", name: "IDNumber" }]}
          formData={formData}
          handleChange={handleChange}
        />
      </div>

      {/* Infomation TH */}
      <div className="mt-4 flex gap-4">
        {/* First Name */}
        <div className="w-1/2">
          <InputFieldGroup
            fields={[{ label: "First Name (Thai)", name: "firstNameTh" }]}
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Last Name*/}
        <div className="w-1/2">
          <InputFieldGroup
            fields={[{ label: "Last Name (Thai)", name: "lastNameTh" }]}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
      </div>

      {/* Infomation EN */}
      <div className="mt-4 flex gap-4">
        {/* First Name*/}
        <div className="w-1/2">
          <InputFieldGroup
            fields={[{ label: "First Name (English)", name: "firstNameEn" }]}
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="w-1/2">
          <InputFieldGroup
            fields={[{ label: "Last Name (English)", name: "lastNameEn" }]}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        {/* Date of Birth */}
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth{" "}
          </label>
          <DatePicker
            selected={formData.dobTh ? new Date(formData.dobTh) : null}
            onChange={(date) => handleDateChange("dobTh", date)}
            dateFormat="MM-dd-yyyy"
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>
        {/* Issue Date */}
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">
            Issue Date
          </label>
          <DatePicker
            selected={formData.issueDate ? new Date(formData.issueDate) : null}
            onChange={(date) => handleDateChange("issueDate", date)}
            dateFormat="MM-dd-yyyy"
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Expire Date */}
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">
            Expire Date
          </label>
          <DatePicker
            selected={
              formData.expireDate ? new Date(formData.expireDate) : null
            }
            onChange={(date) => handleDateChange("expireDate", date)}
            dateFormat="MM-dd-yyyy"
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <hr className="mt-6 mb-6 border-t border-gray-300" />

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

      <hr className="mt-6 mb-6 border-t border-gray-300" />

      {/* Address */}
      <InputFieldGroup
        fields={[{ label: "Address", name: "address" }]}
        formData={formData}
        handleChange={handleChange}
      />

      {/* Province */}
      <ProvinceDropdown
        value={formData.province ? formData.province : null}
        onChange={handleProvinceChange}
      />

      {/* District */}
      <DistrictsDropdown
        value={formData.district ? formData.district : null}
        onChange={handleDistrictChange}
      />

      {/* Subdistrict */}
      <SubdistrictsDropdown
        value={formData.subdistrict ? formData.subdistrict : null}
        onChange={handleSubDistrictChange}
      />
    </div>
  );
};

export default PersonalInfoForm;
