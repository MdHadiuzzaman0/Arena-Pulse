import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { getBookingData } from "@/lib/data";
import Image from "next/image";
import { IoCalendarOutline, IoTimeOutline, IoHourglassOutline, IoPricetagOutline } from "react-icons/io5";
import DeleteBooking from "@/components/DeleteBooking";

const MyBookingCard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    const {token} = await auth.api.getToken({
          headers: await headers()
        })

    const bookingData = await getBookingData(session?.user?.email, token) || [];

    return (
        <main className="min-h-screen bg-zinc-950 py-12 px-6 lg:px-16 text-white">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="space-y-2 border-b border-zinc-900 pb-6">
                    <h1 className="text-3xl font-sports font-black uppercase tracking-wide text-white">
                        My <span className="text-arenaOrange">Bookings</span>
                    </h1>
                    <p className="text-sm text-zinc-400 font-body">
                        Manage your scheduled slots and arena entrance passes.
                    </p>
                </div>

                {bookingData.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {bookingData.map((item) => {
                            {/* const formattedDate = item.date 
                                ? new Date(item.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                  })
                                : "N/A"; */}
                                // console.log(item._id)
                            return (
                                <div
                                    className="bg-arenaCard border border-zinc-900 rounded-2xl overflow-hidden hover:border-arenaOrange/40 transition-all duration-300 group flex flex-col sm:flex-row items-center gap-6 p-5 shadow-xl relative"
                                    key={item._id || item.id}
                                >
                                    {/* Image Section */}
                                    <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                                        <Image
                                            src={item.image || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2"}
                                            alt={item.name || "Arena image"}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                                        />
                                        {item.status && (
                                            <span className="absolute top-3 left-3 bg-arenaOrange text-white border border-emerald-500/20 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold tracking-wider backdrop-blur-md">
                                                {item.status}
                                            </span>
                                        )}
                                    </div>

                                    {/* Information Section */}
                                    <div className="flex-1 w-full space-y-4">
                                        <div>
                                            <h3 className="text-xl font-sports font-black text-white uppercase tracking-wide group-hover:text-arenaOrange transition-colors line-clamp-1">
                                                {item.name}
                                            </h3>
                                        </div>

                                        {/* item Details Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-zinc-900/50">
                                            {/* Date */}
                                            <div className="flex items-center gap-2 text-zinc-400 text-sm font-body">
                                                <IoCalendarOutline className="text-arenaOrange shrink-0 text-base" />
                                                <span>Date: <strong className="text-zinc-200">{item.date}</strong></span>
                                            </div>

                                            {/* Slot */}
                                            <div className="flex items-center gap-2 text-zinc-400 text-sm font-body">
                                                <IoTimeOutline className="text-arenaOrange shrink-0 text-base" />
                                                <span className="line-clamp-1">Slot: <strong className="text-zinc-200">{item.slot}</strong></span>
                                            </div>

                                            {/* Duration */}
                                            <div className="flex items-center gap-2 text-zinc-400 text-sm font-body">
                                                <IoHourglassOutline className="text-arenaOrange shrink-0 text-base" />
                                                <span>Duration: <strong className="text-zinc-200">{item.hours} Hours</strong></span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center gap-2 text-zinc-300 font-medium text-sm font-body">
                                                <IoPricetagOutline className="text-emerald-400 shrink-0 text-base" />
                                                <span>Paid: <strong className="text-white text-base font-bold">${item.price}</strong></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delete/Cancel Button Section (Inside Card Flex Container) */}
                                    <div className="w-full sm:w-auto flex justify-end items-end shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-900/50">
                                      <DeleteBooking name={item.name} id={item._id}/>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 border border-dashed border-zinc-900 rounded-2xl bg-zinc-900/20">
                        <p className="text-zinc-500 font-mono text-sm">You haven't booked any facilities yet.</p>
                    </div>
                )}

            </div>
        </main>
    );
};

export default MyBookingCard;