import React from "react";

interface InputFieldGroupProps {
  fields: { label: string; name: string }[];
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputFieldGroup: React.FC<InputFieldGroupProps> = ({ fields, formData, handleChange }) => {
  return (
    <>
      {fields.map(({ label, name }) => (
        <div className="mt-4" key={name}>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>
      ))}
    </>
  );
};

export default InputFieldGroup;
