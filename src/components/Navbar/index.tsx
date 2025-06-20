import  { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 glass-effect border-b border-amber-300/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold text-amber-900">snappy.bio</div>

        {/* Center nav */}
        <div className="hidden md:flex items-center  md:ml-27 space-x-6">
          {["Pricing", "Features", "Examples"].map((item) => (
            <a
              key={item}
              href="#"
              className="nav-link text-amber-900"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right nav */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="nav-link text-amber-900">Sign In</a>
          <a
            href="#"
            className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-amber-900" />
            ) : (
              <Menu className="w-6 h-6 text-amber-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-3 glass-effect border-t border-amber-300/30">
          {["Pricing", "Features", "Examples", "Sign In"].map((item) => (
            <a
              key={item}
              href="#"
              className="nav-link text-amber-900"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition w-max"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
