import { BackgroundChooser } from "../comps/BackgroundChooser";
import { useEditorStore } from "../../../store/store";
import { BasicInfo } from "../comps/BasicInfo";
import { LinkEditor } from "../comps/LinkEditor";

const Profile = () => {
  const { backgroundColor } = useEditorStore();

  return (
    <div
      className="mx-auto my-8 sm:my-12 md:my-16 lg:my-20 p-4 sm:p-6 md:p-10 lg:p-12 max-w-xl rounded-lg shadow-xl transition-colors duration-300 ease-in-out"
      style={{ backgroundColor }}
    >
      <BasicInfo />
      <LinkEditor />
      <BackgroundChooser />
    </div>
  );
};

export default Profile;
