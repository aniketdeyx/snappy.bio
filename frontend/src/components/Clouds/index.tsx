
const Clouds = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-5">
        {/* Top row clouds */}
        <div className="absolute top-20 left-8 h-28 w-40 opacity-60">
          <img src="cloud1.png" alt="" className="absolute cloud-bg w-full h-full object-contain" />
        </div>
        <div className="absolute top-1/5 left-1/6 h-30 w-42 opacity-60">
          <img src="cloud2.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        <div className="absolute top-16 left-1/3 h-32 w-44 opacity-60">
          <img src="cloud2.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        <div className="absolute top-24 right-1/4 h-30 w-42 opacity-60">
          <img src="cloud3.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        <div className="absolute top-16 right-8 h-34 w-46 opacity-60">
          <img src="cloud4.png" alt="" className="absolute cloud-bg w-full h-full object-contain a" />
        </div>
        
        {/* Middle row clouds */}
        <div className="absolute top-1/3 left-12 h-36 w-48 opacity-60">
          <img src="cloud5.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        <div className="absolute top-2/5 left-2/3 h-32 w-44 opacity-60">
          <img src="cloud6.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        <div className="absolute top-1/2 right-12 h-38 w-64 opacity-60">
          <img src="cloud1.png" alt="" className="absolute cloud-bg w-full h-full object" />
        </div>
        <div className="absolute top-3/5 left-1/4 h-30 w-42 opacity-60">
          <img src="cloud2.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        
        {/* Center area clouds (smaller to not interfere with content) */}
        {/* <div className="absolute top-1/4 right-1/3 h-24 w-36 opacity-60">
          <img src="cloud3.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div> */}
        <div className="absolute top-3/4 left-1/2 h-26 w-38 opacity-60">
          <img src="cloud4.png" alt="" className="absolute cloud-bg w-full h-full object" />
        </div>
        
        {/* Bottom row clouds */}
        <div className="absolute bottom-30 left-20 h-34 w-46 opacity-60">
          <img src="cloud5.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        <div className="absolute bottom-30 left-1/3 h-32 w-44 opacity-60">
          <img src="cloud6.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        <div className="absolute bottom-36 right-1/4 h-36 w-60 opacity-60">
          <img src="cloud1.png" alt="" className="absolute cloud-bg w-full h-full object" />
        </div>
        <div className="absolute bottom-16 right-20 h-30 w-42 opacity-60">
          <img src="cloud2.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
        <div className="absolute bottom-8 left-2/3 h-28 w-40 opacity-60">
          <img src="cloud3.png" alt="" className="absolute cloud-bg w-full h-full object-contain " />
        </div>
      </div>
  )
}

export default Clouds