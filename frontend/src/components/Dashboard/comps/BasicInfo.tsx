import { useEditorStore } from "../../../store/store";
import { useRef } from "react";

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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border text-sm rounded-md focus:outline-none transition-colors"
          style={{ 
            backgroundColor: inputStyles.backgroundColor,
            color: inputStyles.color,
            borderColor: inputStyles.borderColor
          }}
          placeholder="What should we call you?"
        />
      </div>

      {/* Bio */}
      <div>
        <textarea
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          value={bio}
          placeholder="Tell us about yourself..."
          className="w-full px-4 py-2 border text-sm rounded-md focus:outline-none resize-none transition-colors"
          style={{ 
            backgroundColor: inputStyles.backgroundColor,
            color: inputStyles.color,
            borderColor: inputStyles.borderColor
          }}
        />
      </div>
    </div>
  );
};
