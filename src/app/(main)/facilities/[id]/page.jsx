import Image from "next/image";
import Link from "next/link";
import { getFacilityById } from "@/lib/data";
import { Button } from '@heroui/react';
import { IoLocationOutline, IoPricetagOutline, IoPeopleOutline, IoConstructOutline,IoMailOutline,IoCalendarOutline } from "react-icons/io5";

const FacilityDetailsPage = async ({ params }) => {
    const { id } = await params;
    const facility = await getFacilityById(id);
    // console.log(params, id, facility)
   
  const { _id, name, facility_type, location, price_per_hour, capacity, available_slots, description, image,owner_email, booking_count } = facility;
   
  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-6 lg:px-16 text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
          <Link 
            href="/facilities" 
            className="text-zinc-400 hover:text-white transition-colors text-sm font-mono"
          >
            ← Back to All Facilities
          </Link>
          
          
            <div className="flex items-center gap-3">
              <Button
                type="button"
                className="flex items-center gap-1.5 bg-red-950/30 hover:bg-red-900 text-red-500 border border-red-900/30 px-4 py-2 rounded-md text-sm font-sports uppercase tracking-wider transition-all"
              >
                Book now
              </Button>
            </div>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4">
          
          <div className="lg:col-span-6 w-full aspect-[4/3] relative rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-900 shadow-xl lg:sticky lg:top-24">
            <Image
              src={image}
              alt={name}
              fill
              priority
              className="object-cover opacity-90"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-arenaOrange font-mono uppercase tracking-widest text-xs bg-arenaOrange/10 px-3 py-1 rounded-full border border-arenaOrange/20">
                {facility_type}
              </span>
              <h1 className="text-3xl sm:text-4xl font-sports font-black uppercase tracking-wide text-white pt-2">
                {name}
              </h1>
            </div>

            <p className="text-zinc-400 font-body text-base leading-relaxed border-l-2 border-zinc-800 pl-4 py-1">
              {description || "No specific details provided for this premium facility arena. Contact owner for further rule sets and custom requirements."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-4 bg-arenaCard rounded-xl border border-zinc-900">
                <IoLocationOutline className="text-2xl text-arenaOrange shrink-0" />
                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase">Location</p>
                  <p className="text-sm text-zinc-200 font-medium line-clamp-1">{location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-arenaCard rounded-xl border border-zinc-900">
                <IoPricetagOutline className="text-2xl text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase">Hourly Price</p>
                  <p className="text-sm text-zinc-200 font-medium">${price_per_hour} / Hour</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-arenaCard rounded-xl border border-zinc-900">
                <IoPeopleOutline className="text-2xl text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase">Capacity</p>
                  <p className="text-sm text-zinc-200 font-medium">{capacity} Players Max</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-arenaCard rounded-xl border border-zinc-900">
                <IoConstructOutline className="text-2xl text-purple-400 shrink-0" />
                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase">Total Slots</p>
                  <p className="text-sm text-zinc-200 font-medium">{available_slots?.length || 0} Slots Available</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-arenaCard rounded-xl border border-zinc-900 sm:col-span-2">
                <IoMailOutline className="text-2xl text-sky-400 shrink-0" />
                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase">Owner Contact</p>
                  <p className="text-sm text-zinc-200 font-medium break-all">{owner_email || "Not Available"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-arenaCard rounded-xl border border-zinc-900 sm:col-span-2">
                <IoCalendarOutline className="text-2xl text-pink-400 shrink-0" />
                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase">Popularity</p>
                  <p className="text-sm text-zinc-200 font-medium">{booking_count || 0} Times Booked So Far</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900 mt-12">
          <div className="bg-arenaCard border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-sports font-bold uppercase tracking-wide text-white">
                Reserve Your Time Slot
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-body">
                Select your convenient schedule to secure instant portal confirmation via Better Auth validation.
              </p>
            </div>
          
            <div className="p-6 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/50">
              {available_slots && available_slots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {available_slots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className="bg-zinc-900 hover:bg-arenaOrange/20 border border-zinc-800 hover:border-arenaOrange/50 text-zinc-300 hover:text-white transition-all py-3 px-4 rounded-lg text-sm font-mono text-center cursor-pointer shadow-md"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-zinc-500 text-sm font-mono">No active time slots configured for today.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default FacilityDetailsPage;