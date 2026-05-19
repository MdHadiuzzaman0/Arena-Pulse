"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//create
export async function facilityCreate(formData) {
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
        booking_count: 0
    };

    const res = await fetch('http://localhost:5000/facilities', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
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
export async function facilityDelete ({id, name}){
    const res = await fetch(`http://localhost:5000/facilities/${id}`,{
        method: "DELETE",
    })
    const data = await res.json()
    // console.log(data)
    if(data.deletedCount > 0){
        revalidatePath('/manageFacilities')
        return { success: true, message: `${name} is removed!` }
    }
}