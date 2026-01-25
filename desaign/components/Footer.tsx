import Link from "next/link";
import { ArrowRight, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-md pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
        <div className="md:col-span-1 space-y-6">
          <Link href="/" className="font-playfair font-bold italic text-2xl tracking-tight text-foreground block">
            your des<span className="text-gold-base">(ai)</span>gn
          </Link>
          <div className="flex gap-4">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-base/50 hover:bg-gold-base/10 transition-all cursor-pointer group">
                <Icon className="w-4 h-4 text-white/60 group-hover:text-gold-base" />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <h4 className="font-inter font-bold text-sm mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><a href="#" className="hover:text-gold-base transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-gold-base transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-gold-base transition-colors">API</a></li>
            <li><a href="#" className="hover:text-gold-base transition-colors">Integrations</a></li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h4 className="font-inter font-bold text-sm mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><a href="#" className="hover:text-gold-base transition-colors">About</a></li>
            <li><a href="#" className="hover:text-gold-base transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-gold-base transition-colors">Careers</a></li>
            <li><a href="https://gianaibo.tech" className="hover:text-gold-base transition-colors text-gold-light">← Back to Portfolio</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 flex flex-col items-start md:items-end">
          <h4 className="font-inter font-bold text-sm mb-4">Join Digest</h4>
          <div className="relative w-full max-w-xs">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-base/50 transition-colors"
            />
            <button className="absolute right-1 top-1 bottom-1 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-base hover:text-black transition-all">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>© 2026 your des(ai)gn. All rights reserved.</p>
        <p>Designed by Gian Aibo</p>
      </div>
    </footer>
  );
}
