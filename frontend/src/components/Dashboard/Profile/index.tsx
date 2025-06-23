import { BackgroundChooser } from "../comps/BackgroundChooser";
import { useEditorStore } from "../../../store/store";
import { BasicInfo } from "../comps/BasicInfo";
import { LinkEditor } from "../comps/LinkEditor";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { username,
    bio,
    profileImage,
    links,
    backgroundColor, } = useEditorStore();
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
    </div>
  );
};

export default Profile;
