# Undangan Pernikahan Digital

Struktur mirip undangan modern: overlay pembuka, musik, hero, countdown, detail acara, peta, galeri, amplop digital, RSVP, dan animasi halus.

## Cara pakai
1. Ganti teks [Nama Wanita], [Nama Pria], tanggal, alamat, dan rekening di `index.html`.
2. Letakkan foto di `assets/images/`:
   - `hero.jpg`, `wanita.jpg`, `pria.jpg`, `gallery1.jpg`–`gallery6.jpg`.
3. Letakkan musik latar di `assets/audio/bg-music.mp3`.
4. Edit `scripts/main.js` untuk tanggal acara (`eventDate`).
5. Deploy:
   - GitHub Pages: aktifkan Pages dari branch utama.
   - Vercel: klik “New Project”, pilih repo ini, deploy.

## Catatan
- Jika ingin form RSVP terkirim ke Google Sheets: gunakan Google Forms, lalu arahkan `action` form ke URL form dan sesuaikan `name` field.
- Untuk map, ganti `src` iframe menjadi embed URL lokasi Anda dari Google Maps.
