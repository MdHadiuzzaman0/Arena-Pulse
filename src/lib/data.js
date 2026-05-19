export async function getAllFacilities(){
    const res = await fetch ('http://localhost:5000/facilities')
    return await res.json();
}

export async function getFacilityById(id){
    const res = await fetch (`http://localhost:5000/facilities/${id}`)
    return await res.json();
}

export async function getFacilityByEmail(id){
    const res = await fetch (`http://localhost:5000/facilities/${id}`)
    return await res.json();
}