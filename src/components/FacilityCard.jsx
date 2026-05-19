
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";

const FacilityCard = ({ facility }) => {
  // Destructuring database data (with fallback handling)
  const { _id, name, facility_type, location, price_per_hour, image } = facility;
  console.log(_id)

  return (
    <div className="bg-arenaCard border border-zinc-800/80 rounded-xl overflow-hidden hover:border-arenaOrange/40 transition-all duration-300 group flex flex-col justify-between h-full shadow-lg relative">
      
      <div>
        <div className="relative w-full h-48 overflow-hidden bg-zinc-900">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />

          <span className="absolute top-3 left-3 bg-arenaOrange/90 text-white text-xs font-mono uppercase px-2.5 py-1 rounded font-bold tracking-wider backdrop-blur-sm">
            {facility_type}
          </span>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="text-xl font-sports font-bold text-white uppercase tracking-wide line-clamp-1 group-hover:text-arenaOrange transition-colors">
            {name}    
          </h3>

          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <IoLocationOutline className="text-arenaOrange shrink-0 text-base" />
            <span className="line-clamp-1 font-body">{location}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-300 font-medium">
            <IoPricetagOutline className="text-emerald-400 shrink-0 text-base" />
            <span className="text-sm">Price: <span className="text-white font-bold text-base">${price_per_hour}</span> / Hour</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 mt-4 flex justify-end">
        <Link
          href={`/facilities/${_id}`}
          className="bg-arenaOrange hover:bg-orange-600 text-white font-sports text-sm uppercase px-5 py-2.5 rounded font-bold tracking-wider transition-all shadow-md hover:scale-[1.02]"
        >
          Book Now
        </Link>
      </div>

    </div>
  );
};

export default FacilityCard;