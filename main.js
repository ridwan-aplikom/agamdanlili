// Utils
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* Intro open */
const intro = $('#intro');
const openInviteBtn = $('#openInvite');
const musicToggle = $('#musicToggle');
const bgMusic = $('#bgMusic');

openInviteBtn?.addEventListener('click', () => {
  document.body.classList.add('ready');
  // Autoplay music if allowed
  try { bgMusic.play(); } catch (_) {}
});

/* Music toggle */
let musicOn = false;
musicToggle.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) { bgMusic.play(); } else { bgMusic.pause(); }
  musicToggle.style.background = musicOn ? '#ffe' : '#fff';
});

/* Burger menu */
const burger = $('#navBurger');
let drawer;
burger?.addEventListener('click', () => {
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'mobile-drawer';
    drawer.innerHTML = `
      <a href="#home">Beranda</a>
      <a href="#couple">Mempelai</a>
      <a href="#event">Acara</a>
      <a href="#location">Lokasi</a>
      <a href="#gallery">Galeri</a>
      <a href="#gift">Amplop</a>
      <a href="#rsvp">RSVP</a>
    `;
    document.body.appendChild(drawer);
  }
  drawer.classList.toggle('open');
});

/* Smooth scroll */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      drawer?.classList.remove('open');
    }
  });
});

/* Countdown */
const eventDate = new Date('2025-08-31T10:00:00+07:00'); // WIB
const cdEls = {
  days: $('#cdDays'),
  hours: $('#cdHours'),
  minutes: $('#cdMinutes'),
  seconds: $('#cdSeconds'),
};
function updateCountdown(){
  const now = new Date();
  const diff = eventDate - now;
  if (diff <= 0) {
    cdEls.days.textContent = '00';
    cdEls.hours.textContent = '00';
    cdEls.minutes.textContent = '00';
    cdEls.seconds.textContent = '00';
    return;
  }
  const sec = Math.floor(diff / 1000);
  const d = Math.floor(sec / (3600*24));
  const h = Math.floor((sec % (3600*24)) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  cdEls.days.textContent = String(d).padStart(2,'0');
  cdEls.hours.textContent = String(h).padStart(2,'0');
  cdEls.minutes.textContent = String(m).padStart(2,'0');
  cdEls.seconds.textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* Lightbox */
const lightbox = $('#lightbox');
const lightboxImg = $('#lightboxImg');
const closeLightbox = $('.lightbox-close', lightbox);

$$('.gallery .m-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox.click();
});

/* Copy to clipboard */
$$('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const val = btn.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(val);
      btn.textContent = 'Disalin ✓';
      setTimeout(() => btn.textContent = btn.classList.contains('btn-light') ? 'Salin...' : 'Salin', 1500);
    } catch {
      alert('Gagal menyalin. Silakan salin manual.');
    }
  });
});

/* Back to top */
const backToTop = $('#backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 600 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

/* RSVP local save */
const rsvpForm = $('#rsvpForm');
const wishList = $('#wishList');
function renderWishes(){
  const wishes = JSON.parse(localStorage.getItem('wishes')||'[]');
  wishList.innerHTML = wishes.map(w => `
    <div class="wish-item">
      <div class="wish-name">${w.name} — <small>${w.status}</small></div>
      <div class="wish-message">${w.message || ''}</div>
    </div>
  `).join('');
}
renderWishes();

rsvpForm?.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(rsvpForm).entries());
  const wishes = JSON.parse(localStorage.getItem('wishes')||'[]');
  wishes.unshift({
    name: data.name,
    status: data.status === 'hadir' ? 'Hadir' : 'Tidak Hadir',
    message: data.message
  });
  localStorage.setItem('wishes', JSON.stringify(wishes));
  rsvpForm.reset();
  renderWishes();
});

/* Guest name from URL ?to=Nama */
const params = new URLSearchParams(location.search);
const toName = params.get('to');
if (toName) {
  const guestName = $('#guestName');
  guestName.textContent = decodeURIComponent(toName);
}
