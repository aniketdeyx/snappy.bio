import { useEditorStore } from "../../../store/store";
import { useRef, useState } from "react";
import { basicInfoSchema, validateField } from "../../../lib/validations";

interface InputStyles {
  backgroundColor: string;
  color: string;
  borderColor: string;
  placeholderColor: string;
  labelColor: string;
}

interface BasicInfoProps {
  inputStyles: InputStyles;
}

export const BasicInfo = ({ inputStyles }: BasicInfoProps) => {
  const {
    username,
    setUsername,
    bio,
    setBio,
    profileImage,
    setProfileImage,
  } = useEditorStore();

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateUsername = (value: string) => {
    const validation = validateField(basicInfoSchema.shape.username, value);
    if (!validation.isValid) {
      setValidationErrors(prev => ({ ...prev, username: validation.error || '' }));
    } else {
      setValidationErrors(prev => {
        const { username, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateBio = (value: string) => {
    const validation = validateField(basicInfoSchema.shape.bio, value);
    if (!validation.isValid) {
      setValidationErrors(prev => ({ ...prev, bio: validation.error || '' }));
    } else {
      setValidationErrors(prev => {
        const { bio, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    validateUsername(value);
  };

  const handleBioChange = (value: string) => {
    setBio(value);
    validateBio(value);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setProfileImage(data.url); // Save Cloudinary URL
      } else {
        console.error("Upload failed:", data);
      }
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Pic */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center space-y-2">
          {profileImage ? (
            <img
              src={profileImage}
              className="w-24 h-24 rounded-full object-cover cursor-pointer border border-gray-300"
              onClick={() => fileInputRef.current?.click()}
              alt="Profile"
            />
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 rounded-full bg-zinc-700 text-white text-center flex items-center justify-center text-sm cursor-pointer border border-gray-300"
            >
              Set Profile Image
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageUpload(file);
              }
            }}
          />
        </div>
      </div>

      {/* Username */}
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          className={`w-full px-4 py-2 border text-sm rounded-md focus:outline-none transition-colors ${
            validationErrors.username ? 'border-red-500' : ''
          }`}
          style={{ 
            backgroundColor: inputStyles.backgroundColor,
            color: inputStyles.color,
            borderColor: validationErrors.username ? '#ef4444' : inputStyles.borderColor
          }}
          placeholder="Username"
        />
        {validationErrors.username && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>
        )}
      </div>

      {/* Bio */}
      <div>
        <textarea
          onChange={(e) => handleBioChange(e.target.value)}
          rows={3}
          value={bio}
          placeholder="Tell us about yourself..."
          className={`w-full px-4 py-2 border text-sm rounded-md focus:outline-none resize-none transition-colors ${
            validationErrors.bio ? 'border-red-500' : ''
          }`}
          style={{ 
            backgroundColor: inputStyles.backgroundColor,
            color: inputStyles.color,
            borderColor: validationErrors.bio ? '#ef4444' : inputStyles.borderColor
          }}
        />
        {validationErrors.bio && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.bio}</p>
        )}
      </div>
    </div>
  );
};
