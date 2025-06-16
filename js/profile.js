document.addEventListener('DOMContentLoaded', function() {
  // Menú Hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Datos del Usuario
  const userData = {
    name: "Ana López",
    stats: {
      treesPlanted: 15,
      trashCollected: 92,
      volunteerHours: 32
    },
    badges: {
      current: 4,
      nextLevel: 5
    }
  };

  // Actualizar Estadísticas
  document.getElementById('trees-planted').textContent = userData.stats.treesPlanted;
  document.getElementById('trash-collected').textContent = userData.stats.trashCollected;
  document.getElementById('volunteer-hours').textContent = userData.stats.volunteerHours;

  // Barra de Progreso
  const progressPercent = (userData.badges.current / userData.badges.nextLevel) * 100;
  document.getElementById('badge-progress').style.width = `${progressPercent}%`;
  document.getElementById('progress-text').textContent = 
    `(${userData.badges.current}/${userData.badges.nextLevel} para próxima)`;

  // Modal Compartir
  const shareModal = document.getElementById('share-modal');
  const shareText = document.getElementById('share-text');
  const shareButtons = {
    twitter: document.getElementById('share-twitter'),
    facebook: document.getElementById('share-fb'),
    whatsapp: document.getElementById('share-wa')
  };

  // Generar mensaje para compartir
  function generateShareMessage() {
    return `¡He contribuido con ${userData.stats.treesPlanted} árboles plantados y ` +
           `${userData.stats.trashCollected}kg de basura recogida a través de EcoAcción! ` +
           `🌍 #EcoAcción`;
  }

  // Abrir modal para compartir
  document.getElementById('share-profile-btn').addEventListener('click', function() {
    shareText.textContent = generateShareMessage();
    shareModal.style.display = 'flex';
  });

  // Configurar enlaces para compartir
  function setupShareLinks() {
    const message = encodeURIComponent(generateShareMessage());
    const url = encodeURIComponent(window.location.href);
    
    shareButtons.twitter.href = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
    shareButtons.facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
    shareButtons.whatsapp.href = `https://wa.me/?text=${message}%20${url}`;
  }

  // Botones de compartir en sección de insignias
  document.querySelectorAll('[data-network]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const network = this.getAttribute('data-network');
      const message = generateShareMessage();
      
      shareText.textContent = message;
      setupShareLinks();
      
      if (network === 'twitter') {
        shareButtons.twitter.click();
      } else if (network === 'facebook') {
        shareButtons.facebook.click();
      }
    });
  });

  // Cerrar modal
  document.querySelector('.close-modal').addEventListener('click', function() {
    shareModal.style.display = 'none';
  });

  // Cerrar al hacer clic fuera
  window.addEventListener('click', function(e) {
    if (e.target === shareModal) {
      shareModal.style.display = 'none';
    }
  });

  // Inicializar enlaces
  setupShareLinks();

  // Botones de testimonio
  document.querySelectorAll('.btn-testimonial').forEach(btn => {
    btn.addEventListener('click', function() {
      const eventTitle = this.closest('.event-card').querySelector('h4').textContent;
      alert(`Próximamente podrás compartir tu experiencia sobre: "${eventTitle}"`);
    });
  });
});