"use client";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { RiArrowDropDownLine } from "react-icons/ri";

const NavbarRight = () => {
    const router = useRouter();
    const { data: session, isPending} = authClient.useSession();
    const user = session?.user;

    if(isPending){
        return <div>Loading....</div>
    }

    async function logout() {
        await authClient.signOut();
        router.push('/login');
        router.refresh()
    }

    return (
        <div className="navbar-end">
            {!session && (
                <div className="flex items-center gap-4 font-sports text-lg uppercase text-white mr-2">
                    <Link href="/login" className="hover:text-arenaOrange transition-colors">Login</Link>
                    <Link href="/register" className="text-arenaOrange hover:underline">Register</Link>
                </div>
            )}

            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="border border-green-600 px-3 py-2 text-2xl">
                    {session ? (

                        <div className="flex items-center gap-2 ">
                            <Avatar>
                                <Avatar.Image alt="John Doe" src={user?.image} />
                                <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                            <span className="text-sm font-body text-white font-medium hover:text-black">{session.user.name}</span>
                            <RiArrowDropDownLine />
                        </div>
                    ) : (
                        <IoMenu />
                    )}
                </div>

                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-arenaCard rounded-box z-50 mt-3 w-52 p-4 shadow-lg gap-3 font-sports text-lg uppercase text-white border border-white/5"
                >
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/facilities">All Facilities</Link></li>

                    {session && (
                        <>
                            <li><Link href="/myBookings">My Bookings</Link></li>
                            <li><Link href="/addFacility">Add Facility</Link></li>
                            <li><Link href="/manageFacilities">My Facilities</Link></li>

                            <li className="border-t border-white/10 pt-2 mt-1">
                                <Button
                                    onClick={logout}
                                    type="button"
                                    className="text-arenaOrange hover:text-red-500 text-left w-full pl-3 bg-transparent border-none justify-start"
                                >
                                    Logout
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NavbarRight;