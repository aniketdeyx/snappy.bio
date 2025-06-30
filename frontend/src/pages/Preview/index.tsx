import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { 
  getButtonColors, 
  getTextColors, 
  getImageBorderColor,
  getButtonTextColor 
} from "../../lib/colorUtils";
import { userApi } from "../../lib/api";
import type { User, LinkItem } from "../../lib/api";

export const Preview = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userApi.getPublicProfile(username!);
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!profile) return <div className="text-center mt-10">Profile not found</div>;

  const { bio, profileImage, links, appearance } = profile;
  const bgColor = appearance?.bgColor || "#ffffff";
  const buttonColors = getButtonColors(bgColor);
  const textColors = getTextColors(bgColor);
  const imageBorderColor = getImageBorderColor(bgColor);

return (
  <div className="min-h-screen flex flex-col items-center justify-start pt-24 md:pt-28 py-10 px-4 bg-gray-50">
    <div
      className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 bg-white p-6 text-center space-y-4"
      style={{ backgroundColor: bgColor }}
    >
      {/* Profile Image */}
      <div className="flex justify-center">
        {profileImage ? (
          <img
            src={profileImage}
            className="w-24 h-24 rounded-full object-cover border-2 transition-colors"
            style={{ borderColor: imageBorderColor }}
            alt="Profile"
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-sm border-2 transition-colors"
            style={{ 
              backgroundColor: textColors.secondary,
              color: bgColor,
              borderColor: imageBorderColor
            }}
          >
            No Image
          </div>
        )}
      </div>

      {/* Username */}
      <h1 
        className="text-2xl font-semibold transition-colors"
        style={{ color: textColors.primary }}
      >
        {username}
      </h1>

      {/* Bio */}
      <p 
        className="text-sm transition-colors"
        style={{ color: textColors.secondary }}
      >
        {bio}
      </p>

      {/* Links */}
      <div className="pt-4 space-y-3">
        {links?.map((link: LinkItem, idx: number) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
            style={{ 
              backgroundColor: buttonColors.primary,
              color: getButtonTextColor(buttonColors.primary)
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = buttonColors.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = buttonColors.primary;
            }}
          >
            {link.label || "Untitled"}
          </a>
        ))}
      </div>
    </div>
  </div>
);

};

export default Preview;
