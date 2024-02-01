// Set adress
let map = L.map('map').setView([48.190493718277075, 16.353333125430908], 19)

// Show map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Show marker
L.marker([48.190493718277075, 16.353333125430908]).addTo(map).bindPopup('Acostango studio').openPopup()