document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  const guestElement = document.getElementById('guestName');

  if (guestName) {
    guestElement.innerText = decodeURIComponent(guestName);
  }

  const intro = document.getElementById('intro');
  const openBtn = document.getElementById('openInvite');
  const audio = document.getElementById('bgMusic');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  openBtn.addEventListener('click', () => {
    intro.classList.add('hide');
    document.body.style.overflow = 'auto';
    if (!isPlaying) {
      audio.play().catch(() => {});
      musicIcon.classList.add('spinning');
      isPlaying = true;
    }
  });

  const eventDate = new Date("Jan 10, 2026 09:00:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const diff = eventDate - now;
    if (diff > 0) {
      document.getElementById('cdDays').innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
      document.getElementById('cdHours').innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
      document.getElementById('cdMinutes').innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      document.getElementById('cdSeconds').innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    }
  }, 1000);

  const rsvpForm = document.getElementById('rsvpForm');
  const wishList = document.getElementById('wishList');
  let wishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [];

  function renderWishes() {
    wishList.innerHTML = wishes.map(w => `
      <div class="wish-card">
        <span class="status-badge ${w.status === 'Tidak Hadir' ? 'tidak' : ''}">${w.status}</span>
        <h4>${w.name}</h4>
        <p>${w.message}</p>
      </div>
    `).reverse().join('');
  }

  if(rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newWish = {
        name: document.getElementById('formName').value,
        status: document.getElementById('formStatus').value,
        message: document.getElementById('formMessage').value
      };
      wishes.push(newWish);
      localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
      rsvpForm.reset();
      renderWishes();
    });
  }
  renderWishes();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});