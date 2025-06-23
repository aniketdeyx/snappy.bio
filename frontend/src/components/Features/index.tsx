import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Zap, BarChart3, Shield, Smartphone, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Coffee,
      title: "Rich Templates",
      description: "Choose from beautifully crafted templates that are as smooth and satisfying as your morning coffee."
    },
    {
      icon: Zap,
      title: "Instant Brew",
      description: "Your bio page loads as fast as an espresso shot, keeping your audience engaged and energized."
    },
    {
      icon: BarChart3,
      title: "Analytics Blend",
      description: "Track engagement with detailed insights, served fresh like perfectly extracted coffee data."
    },
    {
      icon: Shield,
      title: "Premium Security",
      description: "Your links are protected with enterprise-grade security, as reliable as your favorite coffee shop."
    },
    {
      icon: Smartphone,
      title: "Mobile Roasted",
      description: "Perfect on all devices - phone, tablet, and desktop. Enjoy the same great taste everywhere."
    },
    {
      icon: Globe,
      title: "Custom Domain",
      description: "Use your own domain name to build trust and maintain your unique brand flavor."
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-tl from-[#b08968] via-[#946340] to-[#b08968]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-50">
            Everything you need to
            <span className="gradient-text block">brew success</span>
          </h2>
          <p className=" text-[#ede0d4] max-w-lg mx-auto">
            Powerful features designed to help you create, customize, and serve your perfect digital bio.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gray-100 hover:bg-gray-50 transition-all duration-300 hover:scale-105 coffee-shadow hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-[#9c6644] mr-4">
                    <feature.icon className="text-[#ede0d4]" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900">{feature.title}</h3>
                </div>
                <p className="text-amber-800 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;