import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#69442a] via-[#e7a06d] to-[#6a4022]">
      {/* Background coffee beans effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-700/15 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center mb-6">
          <Coffee className="text-gray-800 mb-1 mr-1" size={24} />
          <span className="text-gray-200 font-medium">Brew Your Digital Presence</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl stroke-black font-bold mb-6 leading-tight text-gray-200">
          Your Perfect
          <span className="gradient-text block">Bio Blend</span>
        </h1>
        
        <p className="text-xl md:text-lg text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Create a rich, aromatic bio page that serves up all your links in one perfectly crafted experience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            variant="secondary"
            className=" text-black hover:shadow-2xl hover:shadow-amber-700/25 transition-all duration-300 text-lg px-8 py-6"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </Button>
          
          <Button 
            variant="default" 
            size="lg"
            className="text-lg px-8 py-6"
          >
            See Examples
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;