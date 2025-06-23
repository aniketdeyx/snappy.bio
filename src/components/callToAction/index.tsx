import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-[#886c45] via-[#cda365] to-[#dbb14f]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="text-amber-700 fill-amber-700" size={20} />
          ))}
          <span className="ml-3 text-amber-800">Trusted by 10,000+ creators</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-amber-900">
          Ready to brew your
          <span className="gradient-text block">perfect bio?</span>
        </h2>
        
        <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto">
          Join thousands of creators, influencers, and businesses who've crafted their perfect digital blend with snapp.bio.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="gradient-bg hover:shadow-2xl hover:shadow-amber-700/25 transition-all duration-300 text-lg px-8 py-6"
          >
            Start Brewing Now
            <ArrowRight className="ml-2" size={20} />
          </Button>
          
          <div className="text-amber-700 text-sm">
            Free forever • No credit card required
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;