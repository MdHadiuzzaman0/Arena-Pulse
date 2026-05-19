import Link from "next/link";
import NavLink from '@/components/NavLink';
import NavbarRight from '@/components/NavbarRight';
import { IoMenu } from "react-icons/io5";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Navbar = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <div className="navbar bg-arenaCard shadow-md border-b border-white/5 px-4">
            <div className="navbar-start">
                <Link href="/" className="text-3xl font-sports font-bold tracking-tight uppercase">
                    Arena<span className="text-arenaOrange italic">Pulse</span>
                </Link>
            </div>

                {!session ?
                    <div className="navbar-center hidden lg:flex items-center gap-6 font-sports text-xl uppercase tracking-wider">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/facilities">All Facilities</NavLink>
                    </div>
                    :
                    <div className="navbar-center hidden lg:flex items-center gap-6 font-sports text-xl uppercase tracking-wider">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/facilities">All Facilities</NavLink>
                        <NavLink href="/myBookings">My Bookings</NavLink>
                        <NavLink href="/addFacility">Add Facility</NavLink>
                        <NavLink href="/manageFacilities">Manage Facilities</NavLink>
                    </div>
                    }
           

            <NavbarRight/>
          
        </div>
    )
}

export default Navbar