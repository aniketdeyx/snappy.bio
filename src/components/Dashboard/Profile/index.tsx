import { BackgroundChooser } from "../comps/BackgroundChooser";
import { useEditorStore } from "../../../store/store";
import { BasicInfo } from "../comps/BasicInfo";
import { LinkEditor } from "../comps/LinkEditor";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const {     username,
    bio,
    profileImage,
    links,
    backgroundColor, } = useEditorStore();
  const saveProfile = async () => {
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
  console.log(data); // { message: "Profile updated" }
};



  return (
    <div
      className="mx-auto my-8 sm:my-12 md:my-16 lg:my-20 p-4 sm:p-6 md:p-10 lg:p-12 max-w-xl rounded-lg shadow-xl transition-colors duration-300 ease-in-out"
      style={{ backgroundColor }}
    >
      <BasicInfo />
      <LinkEditor />
      <BackgroundChooser />
      <Button onClick={saveProfile} className="mt-4 w-full">
        Save Profile
      </Button>
    </div>
  );
};

export default Profile;
