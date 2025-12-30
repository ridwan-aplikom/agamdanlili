document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const openBtn = document.getElementById('openInvite');
  const audio = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  const params = new URLSearchParams(window.location.search);
  const to = params.get('to');
  if (to) {
    document.getElementById('guestName').innerText = decodeURIComponent(to);
  }

  openBtn.addEventListener('click', () => {
    intro.classList.add('hide');
    document.body.style.overflow = 'auto';
    if (!isPlaying) {
      toggleMusic();
    }
  });

  function toggleMusic() {
    if (isPlaying) {
      audio.pause();
      musicIcon.classList.remove('spinning');
    } else {
      audio.play().catch(() => {});
      musicIcon.classList.add('spinning');
    }
    isPlaying = !isPlaying;
  }

  musicToggle.addEventListener('click', toggleMusic);

  const eventDate = new Date("Jan 10, 2026 09:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;
    if (diff < 0) return;
    document.getElementById('cdDays').innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
    document.getElementById('cdHours').innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
    document.getElementById('cdMinutes').innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    document.getElementById('cdSeconds').innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
  }
  setInterval(updateCountdown, 1000);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Berhasil disalin!';
        setTimeout(() => btn.innerText = originalText, 2000);
      });
    });
  });

  const rsvpForm = document.getElementById('rsvpForm');
  const wishList = document.getElementById('wishList');
  let dummyData = JSON.parse(localStorage.getItem('wedding_wishes')) || [
    { name: "Agam & Lili", status: "Hadir", message: "Terima kasih sudah mengunjungi undangan kami!" }
  ];

  function renderWishes() {
    wishList.innerHTML = dummyData.map(data => `
      <div class="wish-card">
        <span class="status-badge ${data.status === 'Tidak Hadir' ? 'tidak' : ''}">${data.status}</span>
        <h4>${data.name}</h4>
        <p>${data.message}</p>
      </div>
    `).reverse().join('');
  }

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newWish = {
      name: document.getElementById('formName').value,
      status: document.getElementById('formStatus').value,
      message: document.getElementById('formMessage').value
    };
    dummyData.push(newWish);
    localStorage.setItem('wedding_wishes', JSON.stringify(dummyData));
    rsvpForm.reset();
    renderWishes();
    wishList.scrollTo({ top: 0, behavior: 'smooth' });
  });

  renderWishes();

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-icon');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.pageYOffset >= section.offsetTop - 150) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});