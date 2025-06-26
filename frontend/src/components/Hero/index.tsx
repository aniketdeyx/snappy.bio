import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee } from "lucide-react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import {useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all";

const Hero = () => {

  useGSAP(() => {
    const heroText = SplitText.create(".hero-upper-text", {type: "chars"});
    
    const tl = gsap.timeline({
      delay: 0.3,
    });
    tl.to(".hero-container", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }).to("#hero-content", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.out",
      duration: 1,
    }, "-=0.5").from(".hero-text-button", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.5").from(heroText.chars, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.04,
      ease: "power2.out",
    })
  }, [])

  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#ede0d4] via-[#e6ccb2] to-[#ede0d4]">
      {/* Background coffee beans effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-700/15 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative opacity-0 hero-container z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex items-center hero-upper-text justify-center mb-6">
          <Coffee className="text-gray-800 mb-1" size={24} />
          <span className="text-[#7f5539]/60  px-3 font-medium">Brew Your Digital Presence</span>
        </div>
        
        <h1 id="hero-content" style={{clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)"}} className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-[#7f5539]">
          Your Perfect
          <span className="gradient-text block">Bio Blend</span>
        </h1>
        
        <p className="text-xl hero-text-button md:text-lg text-wrap text-[#9c6644] mb-8 max-w-xl mx-auto leading-relaxed">
          Create a rich, aromatic bio page that serves up all your links in one perfectly crafted experience.
        </p>
        
        <div className="flex flex-col hero-text-button sm:flex-row gap-4 justify-center items-center">
          <Button
          onClick={() =>  navigate("/auth")}
            size="lg" 
            variant="default"
            className=" text-black cursor-pointer hover:shadow-2xl rounded-full hover:shadow-amber-700/25 transition-all duration-300 text-lg px-8 py-6"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </Button>
          
          <div className="hero-text-button">
            <Button 
            variant="default" 
            size="lg"
            className="text-lg px-8 cursor-pointer  py-6 rounded-full"
          >
            See Examples
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;