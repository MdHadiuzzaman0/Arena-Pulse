export default function Loading() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-300">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-4 border-zinc-900 border-t-arenaOrange rounded-full animate-spin [animation-duration:0.8s]"></div>
          <div className="absolute inset-3 bg-zinc-800 rounded-full animate-pulse [animation-duration:1.5s]"></div>
        </div>

        <div className="space-y-1 text-center">
          <p className="text-sm font-sports font-black uppercase tracking-widest text-arenaOrange animate-pulse [animation-duration:1.2s]">
            Loading Arena
          </p>
          <p className="text-xs font-body text-zinc-600 animate-in fade-in delay-500 duration-1000 fill-mode-backwards">
            Fetching data for you...
          </p>
        </div>
      </div>
    </main>
  );
}
