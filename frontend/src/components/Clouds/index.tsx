import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Clouds = () => {
  useGSAP(() => {
    // Initial fade-in and rise
    gsap.from(".clouds", {
      opacity: 0,
      y: 50,
      duration: 2,
      ease: "power2.out",
    });

    // Animate each cloud image individually
    gsap.utils.toArray(".cloud-bg").forEach((cloud, i) => {
      gsap.to(cloud as HTMLElement, {
        y: gsap.utils.random(10, 30),
        x: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(4, 8),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.5,
      });
    });
  }, []);

  return (
    <div className="absolute clouds inset-0 pointer-events-none z-5">
      {/* Top row clouds */}
      <div className="absolute top-20 left-8 h-28 w-40 opacity-60">
        <img src="cloud1.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute top-[20%] left-[16%] h-30 w-42 opacity-60">
        <img src="cloud2.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute top-16 left-1/3 h-32 w-44 opacity-60">
        <img src="cloud2.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute top-24 right-1/4 h-30 w-42 opacity-60">
        <img src="cloud3.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute top-16 right-8 h-34 w-46 opacity-60">
        <img src="cloud4.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>

      {/* Middle row clouds */}
      <div className="absolute top-1/4 left-12 h-36 w-48 opacity-60">
        <img src="cloud5.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute top-2/5 left-2/3 h-32 w-44 opacity-60">
        <img src="cloud6.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute top-1/4 right-12 h-38 w-64 opacity-60">
        <img src="cloud1.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute top-[37.5%] left-1/4 h-30 w-42 opacity-60">
        <img src="cloud2.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute top-[37.5%] left-40 h-26 w-38 opacity-60">
        <img src="cloud4.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>

      {/* Bottom row clouds */}
      <div className="absolute bottom-60 left-20 h-34 w-46 opacity-60">
        <img src="cloud5.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-60 right-20 h-30 w-42 opacity-60">
        <img src="cloud2.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default Clouds;
