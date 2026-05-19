
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFacilityByEmail } from "@/lib/data";
import Link from "next/link";
import { Button } from "@heroui/react";
import DeleteFacility from "@/components/DeleteFacility";

const ManageFacilities = async () => {
    const session = await auth.api.getSession({
        headers: await headers() 
    })
    console.log(session)
    const facilities = await getFacilityByEmail(session?.user.email)

    return (
        <div className="min-h-screen bg-black p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-sports font-bold text-white uppercase mb-8">
                    Manage My <span className="text-arenaOrange">Facilities</span>
                </h1>

                {facilities.length === 0 ? (
                    <div className="text-center text-white/60 p-10 bg-arenaCard rounded-xl border border-white/5">
                        <p className="mb-4 font-body">You have not added any facilities yet.</p>
                        <Link href="/addFacility" className="bg-arenaOrange text-white px-4 py-2 rounded font-sports uppercase">
                            Add Facility
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {facilities.map((item) => (
                            <div key={item._id} className="p-5 bg-arenaCard border border-white/5 rounded-xl shadow-xl flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-sports text-white font-bold uppercase truncate">{item.name}</h3>
                                    <p className="text-sm text-white/60 font-body mt-1">{item.facility_type}</p>
                                    <p className="text-arenaOrange font-sports mt-3 text-lg">${item.price_per_hour}/hr</p>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <Link href={`/manageFacilities/edit/${item._id}`} className="w-full">
                                        <Button size="sm" className="bg-white/10 text-white w-full font-sports uppercase">
                                            Edit
                                        </Button>
                                    </Link>
                                    <DeleteFacility id={item._id}/>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageFacilities;
