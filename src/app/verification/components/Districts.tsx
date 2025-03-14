  import React, { useState } from 'react';
  import districtsData from '@/data/districts.json';

  interface District {
    id: number;
    provinceCode: number;
    districtCode: number;
    districtNameEn: string;
    districtNameTh: string;
    postalCode: number;
  }

  interface DistrictsDropdownProps {
    value: number | null;
    onChange: (districtCode: string | null) => void;
  }

  const DistrictsDropdown: React.FC<DistrictsDropdownProps> = ({ value, onChange }) => {
    const [districts, setDistricts] = useState<District[]>(districtsData);

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const districtCode = event.target.value ? event.target.value : null;
      onChange(districtCode);
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="districts">District</label>
        <select
          id="districts"
          value={value || ''}
          onChange={handleDistrictChange} 
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
        >
          <option value="">-- District --</option>
          {districts.map((district) => (
            <option key={district.id} value={district.districtNameEn}>
              {district.districtNameEn}
            </option>
          ))}
        </select>
      </div>
    );
  };

  export default DistrictsDropdown;