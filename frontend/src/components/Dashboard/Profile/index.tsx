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
    navigate("/");
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
      <BasicInfo />
      <LinkEditor />
      <BackgroundChooser />
      <Button onClick={saveProfile} disabled={loading} className="mt-4 w-full">
        {loading ? "Saving..." : "Save Profile"}
      </Button>
      <Button
        variant="outline"
        onClick={() => navigate(`/preview/${username}`)}
        className="w-full mt-2"
      >
        Preview Public Page
      </Button>
    </div>
  );
};

export default Profile;
