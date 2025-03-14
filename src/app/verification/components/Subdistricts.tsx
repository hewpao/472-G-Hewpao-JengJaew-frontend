import React, { useState } from 'react';
import subdistrictsData from '@/data/subdistricts.json'; // แก้ path ให้ถูกต้อง

interface Subdistrict {
  id: number;
  provinceCode: number;
  districtCode: number;
  subdistrictCode: number;
  subdistrictNameEn: string;
  subdistrictNameTh: string;
  postalCode: number;
}

interface SubdistrictsDropdownProps {
  value: number | null;
  onChange: (subdistrictCode: string | null) => void;
}

const SubdistrictsDropdown: React.FC<SubdistrictsDropdownProps> = ({ value, onChange }) => {
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>(subdistrictsData);

  const handleSubdistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subdistrictCode = event.target.value ? event.target.value : null;
    onChange(subdistrictCode);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor="subdistricts">Subdistrict</label>
      <select
        id="subdistricts"
        value={value || ''}
        onChange={handleSubdistrictChange}
        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
      >
        <option value="">-- Subdistrict --</option>
        {subdistricts.map((subdistrict) => (
          <option key={subdistrict.id} value={subdistrict.subdistrictNameEn}>
            {subdistrict.subdistrictNameEn}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubdistrictsDropdown;