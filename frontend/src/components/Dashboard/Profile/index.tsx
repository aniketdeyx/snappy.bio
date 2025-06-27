import { BackgroundChooser } from "../comps/BackgroundChooser";
import { useEditorStore } from "../../../store/store";
import { BasicInfo } from "../comps/BasicInfo";
import { LinkEditor } from "../comps/LinkEditor";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // loading during fetch
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const { username,
    bio,
    profileImage,
    links,
    backgroundColor,
    setUsername,
    setBio,
    setProfileImage,
    setLinks,
    setBackgroundColor, } = useEditorStore();

  // Function to determine if a color is light or dark
  const isLightColor = (color: string) => {
    if (!color || color === "#ffffff") return true;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  // Get dynamic styles for inputs based on background color
  const getInputStyles = () => {
    const isLight = isLightColor(backgroundColor);
    
    if (isLight) {
      return {
        backgroundColor: "#ffffff",
        color: "#1f2937",
        borderColor: "#d1d5db",
        placeholderColor: "#9ca3af",
        labelColor: "#1f2937"
      };
    } else {
      return {
        backgroundColor: "#f9fafb",
        color: "#111827", 
        borderColor: "#6b7280",
        placeholderColor: "#6b7280",
        labelColor: "#f9fafb"
      };
    }
  };

  const inputStyles = getInputStyles();

  // Get button colors for the preview button
  const getPreviewButtonColors = () => {
    const isLight = isLightColor(backgroundColor);
    
    if (isLight) {
      return {
        backgroundColor: "transparent",
        color: "#1f2937",
        borderColor: "#1f2937",
        hoverBackgroundColor: "#1f2937",
        hoverColor: "#ffffff"
      };
    } else {
      return {
        backgroundColor: "transparent",
        color: "#f9fafb",
        borderColor: "#f9fafb",
        hoverBackgroundColor: "#f9fafb",
        hoverColor: "#1f2937"
      };
    }
  };

  const previewButtonColors = getPreviewButtonColors();

  // Check if current data differs from initial data
  useEffect(() => {
    if (initialData) {
      const currentData = {
        username,
        bio,
        profileImage,
        links: JSON.stringify(links),
        backgroundColor
      };
      
      const hasChanges = 
        currentData.username !== initialData.username ||
        currentData.bio !== initialData.bio ||
        currentData.profileImage !== initialData.profileImage ||
        currentData.links !== initialData.links ||
        currentData.backgroundColor !== initialData.backgroundColor;
      
      setHasUnsavedChanges(hasChanges);
    }
  }, [username, bio, profileImage, links, backgroundColor, initialData]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/profile", {
          credentials: "include",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();


        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");

        setUsername(data.user?.username || "");
        setBio(data.user?.bio || "");
        setProfileImage(data.user?.profileImage);
        setLinks(data?.user.links);
        setBackgroundColor(data.user?.appearance?.bgColor || "#ffffff");
        
        // Store initial data for comparison
        setInitialData({
          username: data.user?.username || "",
          bio: data.user?.bio || "",
          profileImage: data.user?.profileImage,
          links: JSON.stringify(data?.user.links),
          backgroundColor: data.user?.appearance?.bgColor || "#ffffff"
        });
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async () => {
    setLoading(true);
    console.log(backgroundColor)
    const res = await fetch("http://localhost:3000/api/user/profile", {
      method: "PUT",
      credentials: "include", // include cookie with token
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        bio,
        profileImage,
        links,
        bgColor: backgroundColor
      }),
    });

    const data = await res.json();
    setLoading(false);
    if (!res.ok) throw new Error(data.error || "Failed to update profile");

    console.log("Success:", data);
    
    // Update initial data to reflect saved state
    setInitialData({
      username,
      bio,
      profileImage,
      links: JSON.stringify(links),
      backgroundColor
    });
    setHasUnsavedChanges(false);
    
    // Don't automatically navigate to preview anymore
  };

  // Function to copy shareable link
  const copyShareableLink = async () => {
    if (!username) return;
    
    const shareableUrl = `${window.location.origin}/${username}`;
    
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };


  if (initialLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-zinc-600 text-sm">Loading your profile...</p>
      </div>
    );
  }
  return (
    <div
      className="mx-auto my-8 sm:my-12 md:my-16 lg:my-20 p-4 sm:p-6 md:p-10 lg:p-12 max-w-xl rounded-lg shadow-xl transition-colors duration-300 ease-in-out"
      style={{ backgroundColor }}
    >
      <BasicInfo inputStyles={inputStyles} />
      <LinkEditor inputStyles={inputStyles} />
      <BackgroundChooser inputStyles={inputStyles} />
      <Button onClick={saveProfile} disabled={loading} className="mt-4 w-full">
        {loading ? "Saving..." : "Save Profile"}
      </Button>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => navigate(`/preview/${username}`)}
          disabled={hasUnsavedChanges || !username}
          className="py-2 px-4 rounded-md border-2 font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: hasUnsavedChanges || !username ? "transparent" : previewButtonColors.backgroundColor,
            color: hasUnsavedChanges || !username ? "#9ca3af" : previewButtonColors.color,
            borderColor: hasUnsavedChanges || !username ? "#d1d5db" : previewButtonColors.borderColor
          }}
          onMouseEnter={(e) => {
            if (!hasUnsavedChanges && username) {
              e.currentTarget.style.backgroundColor = previewButtonColors.hoverBackgroundColor;
              e.currentTarget.style.color = previewButtonColors.hoverColor;
            }
          }}
          onMouseLeave={(e) => {
            if (!hasUnsavedChanges && username) {
              e.currentTarget.style.backgroundColor = previewButtonColors.backgroundColor;
              e.currentTarget.style.color = previewButtonColors.color;
            }
          }}
        >
          {hasUnsavedChanges ? "Save to preview" : "Preview"}
        </button>
        
        <button
          onClick={copyShareableLink}
          disabled={!username}
          className="py-2 px-4 rounded-md border-2 font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: !username ? "transparent" : previewButtonColors.backgroundColor,
            color: !username ? "#9ca3af" : previewButtonColors.color,
            borderColor: !username ? "#d1d5db" : previewButtonColors.borderColor
          }}
          onMouseEnter={(e) => {
            if (username) {
              e.currentTarget.style.backgroundColor = previewButtonColors.hoverBackgroundColor;
              e.currentTarget.style.color = previewButtonColors.hoverColor;
            }
          }}
          onMouseLeave={(e) => {
            if (username) {
              e.currentTarget.style.backgroundColor = previewButtonColors.backgroundColor;
              e.currentTarget.style.color = previewButtonColors.color;
            }
          }}
        >
          {copySuccess ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
