import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "$0",
        features: ["1 Project", "Basic Analytics", "Community Support"],
        highlight: false
    },
    {
        name: "Pro",
        price: "$29",
        features: ["Unlimited Projects", "Neural AI Access", "Priority Support", "Custom Domain"],
        highlight: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: ["Dedicated Infrastructure", "SLA", "Account Manager", "SSO"],
        highlight: false
    }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-playfair italic text-4xl md:text-5xl mb-6">Simple, transparent pricing</h2>
            <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
                <button className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold shadow-lg">Monthly</button>
                <button className="px-6 py-2 rounded-full text-white/60 text-xs font-medium hover:text-white transition-colors">Annual</button>
            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {plans.map((plan, i) => (
            <div 
                key={i} 
                className={`glass-card p-8 relative ${plan.highlight ? 'border-gold-base/40 bg-white/[0.04] scale-105 z-10' : 'hover:border-white/20'}`}
            >
                {plan.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-base text-black text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                        Most Popular
                    </div>
                )}
                <h3 className="font-inter text-sm uppercase tracking-widest text-white/50 mb-4">{plan.name}</h3>
                <div className="font-inter font-bold text-5xl mb-8 flex items-baseline gap-1">
                    {plan.price}
                    {plan.price !== "Custom" && <span className="text-sm font-normal text-white/30">/mo</span>}
                </div>
                
                <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                            <Check className="w-4 h-4 text-gold-base" />
                            {feat}
                        </li>
                    ))}
                </ul>

                <button className={`w-full py-4 rounded-full text-sm font-bold transition-all ${plan.highlight ? 'bg-gold-base text-black hover:bg-gold-light' : 'bg-white/10 hover:bg-white/20'}`}>
                    Get Started
                </button>
            </div>
        ))}
      </div>
    </section>
  );
}
