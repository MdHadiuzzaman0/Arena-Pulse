"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//create
export async function facilityCreate(formData, token) {
    const rawData = Object.fromEntries(formData.entries())
    const available_slots = rawData.available_slots.split(",").map(slot => slot.trim())
    const newFacility = {
        name: rawData.name,
        facility_type: rawData.facility_type,
        location: rawData.location,
        price_per_hour: Number(rawData.price_per_hour),
        capacity: Number(rawData.capacity),
        owner_email: rawData.owner_email,
        image: rawData.image,
        available_slots,
        description: rawData.description,
        booking_count: Number(rawData.booking_count),
    };
    console.log(newFacility)

    const res = await fetch('http://localhost:5000/facilities', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFacility)
    })
    const result = await res.json()
    // console.log(data)
    if (result.acknowledged) {
        revalidatePath('/facilities')
        return { success: true }
    }
}

//delete
export async function facilityDelete({ id, name, token }) {
    const res = await fetch(`http://localhost:5000/facilities/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        },
    })
    const data = await res.json()
    // console.log(data)
    if (data.deletedCount > 0) {
        revalidatePath('/manageFacilities')
        return { success: true, message: `${name} is removed!` }
    }
}

//update
export async function facilityUpdate({ id, modifiedData, token }) {
    const data = modifiedData;
    const res = await fetch(`http://localhost:5000/facilities/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`

        },
        body: JSON.stringify(data)
    })

    const result = await res.json()
    // console.log(result)
    if (result.modifiedCount > 0 || result.matchedCount > 0) {
        revalidatePath('/manageFacilities')
        return { success: true }
    }
}

//insert booking data
export async function bookingData(bookedData, token) {
    console.log("token:", token)  // যোগ করো
    console.log("bookedData:", bookedData)  // যোগ করো
    const data = bookedData;
    const res = await fetch('http://localhost:5000/myBookings', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })

    console.log("res status:", res.status)  // যোগ করো
    const result = await res.json()
    console.log("result:", result)  // যোগ করো
    if (result.insertedId) {
        revalidatePath('/myBookings');
        return { success: true };
    }
}

//booking data delete
export async function bookingDelete({ id, name, token }) {
    const res = await fetch(`http://localhost:5000/myBookings/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        },
    })
    const data = await res.json()
    // console.log(data)
    if (data.deletedCount > 0) {
        revalidatePath('/myBookings')
        return { success: true, message: `${name} is removed!` }
    }
    return { success: false }
}

//filter
export async function fetchFilteredFacilities(sportsArray) {
    const res = await fetch(`http://localhost:5000/facilities/filter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sportsArray),
    });
    const result = await res.json()
    // console.log(data)
    return result;
}

//serach
export async function searchFacilities(text) {
    const res = await fetch(`http://localhost:5000/facilities/search?searchedValue=${text}`)
    const result = await res.json()
    // console.log(data)
    return result;
}



