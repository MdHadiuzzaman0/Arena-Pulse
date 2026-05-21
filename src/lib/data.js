

export async function getAllFacilities() {
    const res = await fetch('http://localhost:5000/facilities')
    return await res.json();
}

export async function getFacilityById(id, token) {
    const res = await fetch(`http://localhost:5000/facilities/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
    })
    return await res.json();
}

export async function getFacilityByEmail(email) {
    const res = await fetch(`http://localhost:5000/facilitiesByEmail/${email}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return await res.json();
}

export async function getBookingData(email, token) {
    const res = await fetch(`http://localhost:5000/myBookingsByEmail/${email}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return await res.json();
}

