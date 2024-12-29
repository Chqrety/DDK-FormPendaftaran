async function fetchProvinces() {
    try {
        const response = await fetch(
            "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
        )
        const provinces = await response.json()

        const selectProvinsi = document.getElementById("provinsi")

        provinces.forEach((province) => {
            const option = document.createElement("option")
            option.value = province.id
            option.textContent = province.name
            selectProvinsi.appendChild(option)
        })
    } catch (error) {
        console.error("Error fetching provinces:", error)
    }
}

async function fetchCitiesByProvince(provinsiId) {
    try {
        if (!provinsiId) return

        const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsiId}.json`,
        )
        const cities = await response.json()

        const selectKota = document.getElementById("kota")
        selectKota.innerHTML = '<option value="">Pilih Kota</option>'
        cities.forEach((city) => {
            const option = document.createElement("option")
            option.value = city.id
            option.textContent = city.name
            selectKota.appendChild(option)
        })
    } catch (error) {
        console.error("Error fetching cities:", error)
    }
}

document.getElementById("provinsi").addEventListener("change", function () {
    const selectedProvinsiId = this.value
    fetchCitiesByProvince(selectedProvinsiId)
})

document.addEventListener("DOMContentLoaded", fetchProvinces)
