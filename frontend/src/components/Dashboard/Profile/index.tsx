import { BackgroundChooser } from "../comps/BackgroundChooser";
import { useEditorStore } from "../../../store/store";
import { BasicInfo } from "../comps/BasicInfo";
import { LinkEditor } from "../comps/LinkEditor";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { profileSchema, validateForm } from "../../../lib/validations";
import { getInputStyles, getPreviewButtonColors } from "../../../lib/colorUtils";
import { userApi } from "../../../lib/api";
import type { ProfileUpdateData } from "../../../lib/api";

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

  // Generate dynamic styles based on background color
  const inputStyles = getInputStyles(backgroundColor);
  const previewButtonColors = getPreviewButtonColors(backgroundColor);

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
        const data = await userApi.getProfile();

        if (!data.user) throw new Error(data.error || "Failed to fetch profile");

        setUsername(data.user?.username || "");
        setBio(data.user?.bio || "");
        setProfileImage(data.user?.profileImage || null);
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
    // Validate the entire profile before saving
    const profileData = {
      username,
      bio,
      profileImage: profileImage || undefined, // Convert null to undefined for Zod
      links,
      backgroundColor
    };

    const validation = validateForm(profileSchema, profileData);
    
    if (!validation.isValid) {
      console.error("Validation errors:", validation.errors);
      // You could show these errors to the user here
      return;
    }

    setLoading(true);
    console.log(backgroundColor)
    
    try {
      const updateData: ProfileUpdateData = {
        username,
        bio,
        profileImage: profileImage || undefined,
        links,
        bgColor: backgroundColor
      };

      const data = await userApi.updateProfile(updateData);
      
      if (!data.user) throw new Error(data.error || "Failed to update profile");

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
    } catch (error) {
      console.error("Save failed:", error);
      // You could show an error message to the user here
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen pt-24 md:pt-28 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
      <div
        className="mx-auto max-w-xl rounded-lg shadow-xl transition-colors duration-300 ease-in-out p-6 sm:p-8 md:p-10 lg:p-12"
        style={{ backgroundColor }}
      >
        <BasicInfo inputStyles={inputStyles} />
        <LinkEditor inputStyles={inputStyles} />
        <BackgroundChooser inputStyles={inputStyles} />
        <Button onClick={saveProfile} disabled={loading} className="mt-4 cursor-pointer w-full">
          {loading ? "Saving..." : "Save Profile"}
        </Button>
        
        <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2 overflow-hidden">
          <button
            onClick={() => navigate(`/preview/${username}`)}
            disabled={hasUnsavedChanges || !username}
            className="py-2 px-1 sm:px-4 cursor-pointer rounded-md border-2 font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm min-w-0 overflow-hidden"
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
            <span className="block w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">
              {hasUnsavedChanges ? "Save to preview" : "Preview"}
            </span>
          </button>
          
          <button
            onClick={copyShareableLink}
            disabled={!username}
            className="py-2 px-1 sm:px-4 cursor-pointer rounded-md border-2 font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm min-w-0 overflow-hidden"
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
            <span className="block w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">
              {copySuccess ? "Copied!" : "Copy Link"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
