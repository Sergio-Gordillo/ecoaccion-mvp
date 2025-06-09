// Datos de eventos
const events = [
  {
    id: 1,
    name: "Limpieza de Playa",
    date: "15 Junio 2025",
    description: "Recolección de plásticos en Playa Azul",
    location: { lat: 19.4326, lng: -99.1332 },
    type: "limpieza"
  },
  {
    id: 2,
    name: "Reforestación Parque Central",
    date: "20 Junio 2025",
    description: "Plantación de 100 árboles",
    location: { lat: 19.4360, lng: -99.1300 },
    type: "reforestacion"
  }
];

// Cargar eventos en la página principal
document.addEventListener('DOMContentLoaded', function() {
  const eventsContainer = document.getElementById('events-container');
  
  if (eventsContainer) {
    events.forEach(event => {
      eventsContainer.innerHTML += `
        <div class="event-card">
          <h3>${event.name}</h3>
          <p>📅 ${event.date}</p>
          <p>${event.description}</p>
          <a href="event.html?id=${event.id}" class="btn-primary">Ver Detalles</a>
        </div>
      `;
    });
  }

  // Mapa principal
  if (document.getElementById('map')) {
    const map = L.map('map').setView([19.4326, -99.1332], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    events.forEach(event => {
      L.marker([event.location.lat, event.location.lng])
        .addTo(map)
        .bindPopup(event.name);
    });

    setTimeout(() => map.invalidateSize(), 100);
  }

  // Menú hamburguesa
  document.getElementById('menu-toggle')?.addEventListener('click', function() {
    document.getElementById('main-nav').classList.toggle('active');
  });
});