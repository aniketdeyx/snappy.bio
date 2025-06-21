import { Coffee, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-[#ae744a]/40">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-amber-800">
                <Coffee className="text-white" size={16} />
              </div>
              <span className="text-lg font-bold gradient-text">snapp.bio</span>
            </div>
            <p className="text-amber-800 text-sm">
              The smoothest way to create a rich bio page for all your links.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-amber-900">Product</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li><a href="#" className="hover:text-amber-700 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-amber-700 transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-amber-700 transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-amber-700 transition-colors">Custom Domains</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-amber-900">Support</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li><a href="#" className="hover:text-amber-700 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-amber-700 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-700 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-amber-700 transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-amber-900">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-800 hover:text-amber-700 transition-colors">
                Tw
              </a>
              <a href="#" className="text-amber-800 hover:text-amber-700 transition-colors">
                In
              </a>
              <a href="#" className="text-amber-800 hover:text-amber-700 transition-colors">
                Gi
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-amber-800">
          <p>&copy; 2024 snapp.bio. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <span>Brewed with</span>
            <Heart className="text-amber-700 mx-1" size={16} />
            <span>for creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
