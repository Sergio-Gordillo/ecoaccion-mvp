document.addEventListener('DOMContentLoaded', function() {
  // Datos de ejemplo para eventos
  const events = [
    {
      id: 1,
      name: "Limpieza de Playa",
      date: "15 Oct 2024",
      time: "9:00 AM",
      location: "Playa Azul",
      description: "Jornada de recolección de plásticos y residuos. Trae guantes, bloqueador solar y ropa cómoda.",
      coords: [19.4326, -99.1332],
      image: "img/beach-cleanup.jpg"
    },
    {
      id: 2,
      name: "Reforestación Urbana",
      date: "20 Nov 2024",
      time: "8:00 AM",
      location: "Parque Central",
      description: "Plantación de árboles nativos. Incluye taller de cuidado de plantas para principiantes.",
      coords: [19.4360, -99.1300],
      image: "img/tree-planting.jpg"
    },
    {
      id: 3,
      name: "Taller de Composta",
      date: "5 Dic 2024",
      time: "10:00 AM",
      location: "Centro Comunitario",
      description: "Aprende a convertir tus residuos orgánicos en abono para plantas. Trae un recipiente pequeño.",
      coords: [19.4340, -99.1350],
      image: "img/compost-workshop.jpg"
    }
  ];

  // Inicializar mapa
  const map = L.map('map').setView([19.4326, -99.1332], 13);

  // Añadir capa de mapa base
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Añadir marcadores para cada evento
  const markers = [];
  events.forEach(event => {
    const marker = L.marker(event.coords)
      .addTo(map)
      .bindPopup(`
        <b>${event.name}</b><br>
        <i class="far fa-calendar-alt"></i> ${event.date} - ${event.time}<br>
        <i class="fas fa-map-marker-alt"></i> ${event.location}
      `);
    markers.push(marker);
  });

  // Ajustar el mapa para mostrar todos los marcadores
  if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  }

  // Cargar eventos en el grid
  const eventsContainer = document.getElementById('events-container');
  
  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
      <img src="${event.image}" alt="${event.name}" class="event-image">
      <div class="event-content">
        <h3>${event.name}</h3>
        <div class="event-meta">
          <span><i class="far fa-calendar-alt"></i> ${event.date}</span>
          <span><i class="far fa-clock"></i> ${event.time}</span>
        </div>
        <p class="event-description">${event.description}</p>
        <a href="event.html?id=${event.id}" class="btn-details">Ver detalles</a>
      </div>
    `;
    eventsContainer.appendChild(eventCard);
  });

  // Menú hamburguesa para móviles
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Forzar redibujado del mapa después de que todo cargue
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
});