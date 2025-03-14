import React, { useState } from 'react';
import provincesData from '@/data/provinces.json';

interface Province {
  id: number;
  provinceCode: number;
  provinceNameEn: string;
  provinceNameTh: string;
}

interface ProvinceDropdownProps {
  value: number | null;
  onChange: (provinceId: string | null) => void;
}

const ProvinceDropdown: React.FC<ProvinceDropdownProps> = ({ value, onChange }) => {
  const [provinces, setProvinces] = useState<Province[]>(provincesData);

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = event.target.value ? event.target.value : null;
    onChange(provinceId);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor="province">Province</label>
      <select
        id="province"
        value={value || ''}
        onChange={handleProvinceChange}
        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
      >
        <option value="">-- Province --</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.provinceNameEn}>
            {province.provinceNameEn}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceDropdown;