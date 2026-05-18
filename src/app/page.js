"use client";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 lg:px-16 py-20 bg-zinc-950">

      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1631548532844-7409538a1690?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="ArenaPulse Indoor Court"
          fill
          priority
          className="object-cover object-center"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-zinc-950/20" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent" />

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        <div className="lg:col-span-9 space-y-7 text-center lg:text-left">

          <div className="inline-block">
            <span className="text-arenaOrange font-mono browser-default uppercase tracking-widest text-xs sm:text-sm bg-zinc-950/80 px-4 py-2 rounded-full border border-arenaOrange/30 backdrop-blur-md shadow-lg">
              Welcome to ArenaPulse Portal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sports font-black uppercase text-white leading-none tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            Your Ultimate Arena <br />
            Book with <span className="text-arenaOrange italic relative">ArenaPulse</span>
          </h1>

          <p className="text-zinc-200 font-body text-base sm:text-md lg:text-lg max-w-3xl mx-auto lg:mx-0 leading-relaxed drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] font-medium">
            Discover and reserve premium football turfs, professional badminton courts, and high-performance sports facilities near you. 
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link 
              href="/allFacilities" 
              className="bg-arenaOrange hover:bg-orange-600 text-white font-sports text-lg uppercase px-10 py-4 rounded-md font-bold tracking-wide transition-all shadow-xl shadow-black/50 hover:scale-[1.02] text-center"
            >
              Explore Facilities
            </Link>
            
            <Link 
              href="#how-it-works" 
              className="border border-zinc-500 bg-zinc-950/80 hover:bg-zinc-950 text-zinc-100 font-sports text-lg uppercase px-10 py-4 rounded-md font-semibold tracking-wide transition-all text-center shadow-xl shadow-black/40 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>

        </div>

        <div className="hidden lg:block lg:col-span-3" />

      </div>
    </section>
  );
};

export default HeroSection;