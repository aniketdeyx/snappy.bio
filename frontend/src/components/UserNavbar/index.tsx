import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/store.ts";

const UserNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      clearUser();
      navigate('/')
    } catch (error) {
      console.error("Logout failed:", error);
    }

  }
  const { clearUser } = useAuthStore();

  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between shadow-md bg-white">
      <Link to="/" className="text-xl font-semibold text-brown-800">
        snappy.bio
      </Link>
      <div className="flex items-center space-x-4 text-sm">
        <Link
          to="/dashboard"
          className="text-brown-800 hover:text-brown-600 transition"
        >
          Dashboard
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
