"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, Mail, Phone, Edit, Save, X, IdCard, CheckCircle, XCircle} from "lucide-react";
import { User as UserProfile } from "@/interfaces/User";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile>({
    id: "1",
    name: "John",
    surname: "Smith",
    is_verified: true,
    email: "john.smith@example.com",
    phone_number: "123-456-7890",
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (session?.user) {
      fetchUserData();
    } else if (status !== "loading") {
      // If not authenticated and not loading, turn off our loading state
      setLoading(false);
    }
  }, [session, status]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Check if we have an access token in the session
      const accessToken = session?.user?.access_token || session?.access_token;
      
      if (!accessToken) {
        console.error("No access token available");
        createUserFromSession();
        return;
      }
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/profile/me`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          console.log("Fetched user data:", userData);
          
          setUser(userData);
          setFormData(userData);
        } else {
          console.error("API Error:", response.status, await response.text());
          createUserFromSession();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        createUserFromSession();
      }
    } finally {
      setLoading(false);
    }
  };
  
  const createUserFromSession = () => {
    if (session?.user) {
      // Split name into parts if available
      const nameParts = session.user.name?.split(' ') || [];
      const firstName = nameParts[0] || "Guest";
      const surname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : "";
      
      const userData: UserProfile = {
        id: session.user.id || "1",
        name: firstName,
        surname: surname,
        email: session.user.email || "",
        is_verified: true,
        phone_number: "",
      };
      
      setUser(userData);
      setFormData(userData);
    }
  };
  
  const handleSave = async () => {
    try {
      // You can add API call here to update user profile
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/profile/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.access_token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        // Handle error
        console.error('Failed to update profile');
      }
      
      // For now, we'll just update the local state
      setUser(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };
  
  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
  };
  
  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br py-12 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-lg text-[#493D9E]">Loading your profile...</p>
        </div>
      </div>
    );
  }
  
  // Unauthenticated state
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br py-12 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <XCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Not Signed In</h2>
          <p className="text-gray-600 mb-4">Please sign in to view your profile.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-[#493D9E] text-white px-5 py-2 rounded-lg hover:bg-[#382D7E] transition-colors duration-300 shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-[#493D9E] text-white rounded-t-2xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-white rounded-full p-6 shadow-lg">
                <User size={48} className="text-[#493D9E]" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold flex gap-2 items-center">
                {user.name} {user.middle_name ? user.middle_name + " " : ""}{user.surname}
                {user.is_verified ? (
                    <CheckCircle size={20} className="text-green-500" />
                ) : (
                    <XCircle size={20} className="text-red-500" />
                )}
              </h1>
              <p className="text-purple-200 mt-2 flex items-center justify-center md:justify-start gap-2">
                <IdCard size={16} /> {user.id}
              </p>
            </div>
            <div className="md:ml-auto">
              {!editMode && (
                <button 
                  onClick={() => setEditMode(true)} 
                  className="bg-white text-[#493D9E] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-100 transition-colors duration-300"
                >
                  <Edit size={18} />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Card */}
        <div className="bg-white rounded-b-2xl p-8 shadow-lg">
          {editMode ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#493D9E] mb-4">Edit Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="First Name" name="name" value={formData.name} onChange={handleChange} />
                <InputField label="Middle Name" name="middle_name" value={formData.middle_name ?? ""} onChange={handleChange} />
                <InputField label="Surname" name="surname" value={formData.surname} onChange={handleChange} />
                <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" icon={<Mail size={18} className="text-gray-400" />} />
                <InputField label="Phone Number" name="phone_number" value={formData.phone_number ?? ""} onChange={handleChange} icon={<Phone size={18} className="text-gray-400" />} />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button 
                  onClick={handleCancel} 
                  className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  className="flex items-center gap-2 bg-[#493D9E] text-white px-5 py-2 rounded-lg hover:bg-[#382D7E] transition-colors duration-300 shadow-md"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#493D9E] mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard 
                  icon={<User size={20} className="text-[#493D9E]" />}
                  label="Name"
                  value={`${user.name} ${user.middle_name ? user.middle_name + " " : ""}${user.surname}`}
                />
                <InfoCard 
                  icon={<Mail size={20} className="text-[#493D9E]" />}
                  label="Email Address"
                  value={user.email}
                />
                <InfoCard 
                  icon={<Phone size={20} className="text-[#493D9E]" />}
                  label="Phone Number"
                  value={user.phone_number || "Not provided"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InputField({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text",
  icon
}: { 
  label: string; 
  name: string; 
  value?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input 
          type={type} 
          name={name} 
          value={value || ""} 
          onChange={onChange} 
          className={`block w-full border border-gray-300 rounded-lg p-3 ${icon ? 'pl-10' : ''} focus:ring-2 focus:ring-[#493D9E] focus:border-transparent outline-none transition-all duration-200`}
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-gray-900 font-medium mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}