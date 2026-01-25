import Image from "next/image";

export function Team() {
  return (
    <section id="team" className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto">
      <h2 className="font-playfair italic text-4xl md:text-5xl mb-16 text-center">Meet the creators</h2>
      
      <div className="grid grid-cols-1 gap-12 max-w-md mx-auto">
        <div className="group">
            <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <Image src="/team/gian.jpg" alt="Gian Aibo" fill className="object-cover" sizes="(max-width: 768px) 100vw, 448px" />
            </div>
            <h3 className="font-playfair text-3xl mb-2">Gian Aibo</h3>
            <p className="font-inter font-thin uppercase tracking-widest text-gold-base text-xs">Lead Designer & Engineer</p>
        </div>
      </div>
    </section>
  );
}
