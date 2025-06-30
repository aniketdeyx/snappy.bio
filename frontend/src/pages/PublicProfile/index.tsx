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

export const PublicProfile = () => {
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading profile...</p>
      </div>
    </div>
  );
  
  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile not found</h1>
        <p className="text-gray-600">The username "{username}" doesn't exist.</p>
      </div>
    </div>
  );

  const { bio, profileImage, links, appearance } = profile;
  const bgColor = appearance?.bgColor || "#ffffff";
  const buttonColors = getButtonColors(bgColor);
  const textColors = getTextColors(bgColor);
  const imageBorderColor = getImageBorderColor(bgColor);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div
        className="w-full max-w-sm rounded-2xl shadow-2xl border border-gray-200 p-8 text-center space-y-6"
        style={{ backgroundColor: bgColor }}
      >
        {/* Profile Image */}
        <div className="flex justify-center">
          {profileImage ? (
            <img
              src={profileImage}
              className="w-28 h-28 rounded-full object-cover border-4 transition-colors shadow-lg"
              style={{ borderColor: imageBorderColor }}
              alt="Profile"
            />
          ) : (
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-sm border-4 transition-colors shadow-lg"
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
        <div>
          <h1 
            className="text-3xl font-bold transition-colors mb-2"
            style={{ color: textColors.primary }}
          >
            {username}
          </h1>
          
          {/* Bio */}
          {bio && (
            <p 
              className="text-base leading-relaxed transition-colors"
              style={{ color: textColors.secondary }}
            >
              {bio}
            </p>
          )}
        </div>

        {/* Links */}
        {links && links.length > 0 && (
          <div className="pt-2 space-y-4">
            {links.map((link: LinkItem, idx: number) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 px-6 rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
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
        )}

        {/* Powered by footer */}
        <div className="pt-8 border-t border-opacity-20" style={{ borderColor: textColors.secondary }}>
          <p 
            className="text-xs transition-colors opacity-75"
            style={{ color: textColors.secondary }}
          >
            Powered by Snappy.bio
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
