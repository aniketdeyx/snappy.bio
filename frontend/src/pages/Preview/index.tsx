import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: string;
}


export const Preview = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Function to determine if a color is light or dark
  const isLightColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  // Function to get suitable button colors based on background
  const getButtonColors = (bgColor: string) => {
    if (!bgColor || bgColor === "#ffffff") {
      // Default colors for white/light backgrounds
      return {
        primary: "#3b82f6", // Blue
        hover: "#2563eb"
      };
    }

    const isLight = isLightColor(bgColor);
    
    if (isLight) {
      // For light backgrounds, use darker colors
      return {
        primary: "#1f2937", // Dark gray
        hover: "#111827"
      };
    } else {
      // For dark backgrounds, use lighter colors
      return {
        primary: "#f3f4f6", // Light gray
        hover: "#e5e7eb"
      };
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/profile/${username}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
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
  
  // Get text colors based on background
  const getTextColors = () => {
    const isLight = isLightColor(bgColor);
    
    if (isLight) {
      return {
        primary: "#1f2937", // Dark text for light backgrounds
        secondary: "#6b7280" // Medium gray for secondary text
      };
    } else {
      return {
        primary: "#f9fafb", // Light text for dark backgrounds
        secondary: "#d1d5db" // Light gray for secondary text
      };
    }
  };

  const textColors = getTextColors();

  // Get border colors for profile image
  const getImageBorderColor = () => {
    const isLight = isLightColor(bgColor);
    return isLight ? "#d1d5db" : "#6b7280"; // Light gray for light bg, medium gray for dark bg
  };

  const imageBorderColor = getImageBorderColor();

return (
  <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gray-50">
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
              color: isLightColor(buttonColors.primary) ? "#1f2937" : "#ffffff"
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
