import  { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 glass-effect border-b border-amber-300/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to='/'>
        <div className="text-xl font-semibold text-amber-900">snappy.bio</div>
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center text-sm  space-x-6">
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
        <div className="hidden text-sm md:flex bg-[#7f5539] px-4 py-2 rounded-full text-white items-center space-x-4">
          <Link to={`/auth`} className="flex items-center gap-1"><span>Login</span><ArrowRight className="w-4 h-4 "/></Link>
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
         
        </div>
      )}
    </nav>
  );
};

export default Navbar;
