import FacilityCard from "@/components/FacilityCard";
import { getAllFacilities } from "@/lib/data";

const AllFacilitiesPage = async () => {
    const facilities = await getAllFacilities()

  return (
    <main className="min-h-screen bg-zinc-950 text-white py-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-10">

        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-sports font-black uppercase tracking-wide">
            All Sports <span className="text-arenaOrange">Facilities</span>
          </h1>
          <p className="text-zinc-400 text-sm font-body">
            Find and book the best court or turf around your area instantly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-arenaCard p-4 rounded-xl border border-zinc-900 shadow-md">
          
          {/* Search Input Box */}
          <input
            type="text"
            placeholder="Search by facility name..."
            className="w-full sm:max-w-md bg-zinc-950 border border-zinc-800 focus:border-arenaOrange outline-none px-4 py-2.5 rounded-md text-sm text-white placeholder-zinc-600 transition-colors"
          />

          {/* Filter Dropdown Box */}
          <select
            className="w-full sm:w-48 bg-zinc-950 border border-zinc-800 focus:border-arenaOrange outline-none px-4 py-2.5 rounded-md text-sm text-white transition-colors cursor-pointer text-zinc-400"
          >
            <option value="All">All Sports</option>
            <option value="Football">Football</option>
            <option value="Badminton">Badminton</option>
            <option value="Tennis">Tennis</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {facilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}

        </div>

      </div>
    </main>
  );
};

export default AllFacilitiesPage;