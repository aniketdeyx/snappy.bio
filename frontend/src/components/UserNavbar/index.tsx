import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/store.ts";
import { LogOut } from "lucide-react";

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
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-amber-300/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-amber-900">
          snappy.bio
        </Link>
        
        {/* Center nav */}
        <div className="hidden md:flex items-center text-sm space-x-6">
          <Link
            to="/dashboard"
            className="nav-link text-amber-900"
          >
            Dashboard
          </Link>
        </div>

        {/* Right nav */}
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={handleLogout}
            className="hidden md:flex bg-[#c33b15] hover:bg-[#c33b15e6] px-4 py-2 rounded-full text-white items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
          
          {/* Mobile logout button */}
          <button
            onClick={handleLogout}
            className="md:hidden p-2 text-amber-900 hover:text-amber-700 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
