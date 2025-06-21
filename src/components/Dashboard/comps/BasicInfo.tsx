
import { useEditorStore } from "../../../store/store";
import { useRef } from "react";

export const BasicInfo = () => {
  const {
    username,
    setUsername,
    bio,
    setBio,
    profileImage,
    setProfileImage,
  } = useEditorStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
          className="w-24 h-24 rounded-full bg-zinc-700 text-white text-center flex items-center justify-center text-sm  cursor-pointer border border-gray-300"
        >
          set profile image
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result as string);
            reader.readAsDataURL(file);
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
      className="w-full px-4 py-2 border text-sm rounded-md border-gray-400 focus:outline-none"
      placeholder="what should we call you?"
    />
  </div>

  {/* Bio */}
  <div>

    <textarea
      onChange={(e) => setBio(e.target.value)}
      rows={3}
      value={bio}
      placeholder="Tell us about yourself..."
      className="w-full px-4 py-2 border text-sm rounded-md border-gray-400 focus:outline-none resize-none"
    />
  </div>
</div>


  );
};





