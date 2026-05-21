

export async function getAllFacilities() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`)
    return await res.json();
}

export async function getFacilityById(id, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
    })
    return await res.json();
}

export async function getFacilityByEmail(email, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilitiesByEmail/${email}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return await res.json();
}

export async function getBookingData(email, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/myBookingsByEmail/${email}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return await res.json();
}

