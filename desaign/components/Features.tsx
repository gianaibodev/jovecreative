import { Component, Cpu, Globe, Zap } from "lucide-react";

const features = [
    {
        icon: Component,
        title: "Modular Design",
        desc: "Built with atomic components that scale infinitely."
    },
    {
        icon: Cpu,
        title: "Neural Core",
        desc: "AI-driven layout adjustments in real-time."
    },
    {
        icon: Globe,
        title: "Global Edge",
        desc: "Deployed to 300+ edge locations instantly."
    },
    {
        icon: Zap,
        title: "Instant State",
        desc: "Zero-latency state management for complex apps."
    }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
            <div key={i} className="glass-card p-8 group hover:border-white/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold-base/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <f.icon className="w-6 h-6 text-gold-base" />
                </div>
                <h3 className="font-inter font-bold text-xl mb-3">{f.title}</h3>
                <p className="font-inter text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
        ))}
      </div>
    </section>
  );
}
