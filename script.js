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

function triggerFileInput() {
    const fileInput = document.getElementById("fileInput")
    fileInput.click()
}

function updateBackground() {
    const fileInput = document.getElementById("fileInput")
    const filePlaceholder = document.getElementById("filePlaceholder")
    const textPlaceHolder = document.getElementById("textPlaceHolder")
    const fileNameDisplay = document.getElementById("fileName")

    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0]
        const reader = new FileReader()

        reader.onload = function (e) {
            filePlaceholder.style.backgroundImage = `url(${e.target.result})`
            textPlaceHolder.textContent = ""
            fileNameDisplay.textContent = file.name
        }

        reader.readAsDataURL(file)
    } else {
        fileNameDisplay.textContent = "Tidak ada file dipilih"
    }
}

function resetFileInput() {
    // Reset input file
    const fileInput = document.getElementById("fileInput")
    const textPlaceHolder = document.getElementById("textPlaceHolder")
    const fileNameDisplay = document.getElementById("fileName")

    // Kosongkan input file
    fileInput.value = ""

    // Reset background image dan teks
    filePlaceholder.style.backgroundImage = ""
    textPlaceHolder.textContent = "Klik untuk upload"

    // Reset nama file
    fileNameDisplay.textContent = "Tidak ada file dipilih"
}
