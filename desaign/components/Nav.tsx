import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-6 flex items-center justify-between backdrop-blur-sm bg-background/50 border-b border-white/[0.05]">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-playfair font-bold italic text-2xl tracking-tight text-foreground">
          your des<span className="text-gold-base">(ai)</span>gn
        </Link>
        <div className="hidden md:flex items-center gap-1">
            <a href="https://gianaibo.tech" className="text-[10px] uppercase tracking-widest text-white/50 hover:text-gold-base transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                Back to Portfolio
            </a>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Features", "Pricing", "Team"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[11px] uppercase tracking-wide font-inter text-foreground/80 hover:text-gold-base transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a 
            href="https://gianaibo.tech" 
            className="md:hidden text-[10px] uppercase tracking-widest text-white/50 hover:text-gold-base transition-colors flex items-center gap-1"
        >
            <ArrowLeft className="w-3 h-3" />
        </a>
        <button className="bg-white text-black px-5 py-2 rounded-full text-xs font-medium hover:bg-gold-light transition-colors">
          Start Free Trial
        </button>
      </div>
    </nav>
  );
}
