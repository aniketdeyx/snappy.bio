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

return (
  <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gray-50">
    <div
      className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 bg-white p-6 text-center space-y-4"
      style={{ backgroundColor: appearance?.bgColor || "#ffffff" }}
    >
      {/* Profile Image */}
      {profileImage && (
        <img
          src={profileImage}
          className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-300"
          alt="Profile"
        />
      )}

      {/* Username */}
      <h1 className="text-2xl font-semibold text-gray-800">{username}</h1>

      {/* Bio */}
      <p className="text-sm text-gray-600">{bio}</p>

      {/* Links */}
      <div className="pt-4 space-y-3">
        {links?.map((link: LinkItem, idx: number) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#b08968] text-white py-2 px-4 rounded-lg hover:bg-[#6f4a2e] transition"
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
