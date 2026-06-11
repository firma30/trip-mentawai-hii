// ═══════════════════════════════════════════════════
//  Trip Mentawai Hopping Islands — main.js
// ═══════════════════════════════════════════════════

// ── Navbar: add .scrolled class on scroll ──
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 60);
});

// ── Mobile menu toggle ──
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("hidden");
}

// ── Reveal on scroll (IntersectionObserver) ──
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => revealObserver.observe(el));

// ── Itinerary day tabs ──
function showDay(n) {
  document.querySelectorAll(".day-panel").forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".day-tab").forEach((t) => t.classList.remove("active"));
  document.getElementById("day" + n).classList.add("active");
  document.querySelectorAll(".day-tab")[n - 1].classList.add("active");
}

// ── FAQ accordion ──
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

// ── Terms accordion ──
function toggleAcc(btn) {
  const item = btn.closest(".acc-item");
  item.classList.toggle("open");
}

// ── Testimonial slider ──
// ── Testimonial Slider ──────────────────────────────
(function () {
    const track    = document.getElementById('testiTrackNew');
    const dotsWrap = document.getElementById('testiDots');
    const prevBtn  = document.getElementById('testiPrev');
    const nextBtn  = document.getElementById('testiNext');
    if (!track) return;

    const slides = track.querySelectorAll('.testi-slide');
    const total  = slides.length;
    let current  = 0;
    let timer    = null;

    // Buat dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    function updateDots() {
        dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + current * 100 + '%)';
    // Sesuaikan tinggi viewport dengan tinggi slide aktif
    const activeImg = slides[current].querySelector('img');
    if (activeImg.complete) {
        viewport.style.height = activeImg.offsetHeight + 'px';
    } else {
        activeImg.onload = () => {
            viewport.style.height = activeImg.offsetHeight + 'px';
        };
    }
    updateDots();
}

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() { timer = setInterval(next, 4500); }
    function stopAuto()  { clearInterval(timer); }

    prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
    nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

    // Swipe support untuk mobile
    let touchStartX = 0;
    const viewport = document.getElementById('testiViewport');
    viewport.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        stopAuto();
    }, { passive: true });
    viewport.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        startAuto();
    }, { passive: true });

    startAuto();
})();

// ── Why Card toggle ──
function toggleWhyCard(el) {
    document.querySelectorAll('.why-card.open').forEach(c => {
        if (c !== el) c.classList.remove('open');
    });
    el.classList.toggle('open');
}

// ── Contact Form → WhatsApp ──
function kirimWA() {
    const nama  = document.getElementById('contactNama').value.trim();
    const wa    = document.getElementById('contactWA').value.trim();
    const paket = document.getElementById('contactPaket').value;
    const pesan = document.getElementById('contactPesan').value.trim();

    if (!nama || !wa) {
        alert('Mohon isi Nama dan Nomor WhatsApp terlebih dahulu.');
        return;
    }

    const teks = `Halo Kak Putra 👋\n\nSaya ingin bertanya tentang Trip Mentawai Hopping Islands.\n\n*Nama:* ${nama}\n*No. WA:* ${wa}\n*Paket:* ${paket}\n*Pesan:* ${pesan || '-'}`;

    window.open('https://wa.me/6281374140787?text=' + encodeURIComponent(teks), '_blank');
}

// ── Floating buttons hilang saat scroll ──
const floatingBtns = document.querySelector('.floating-btns');
let scrollTimer = null;

window.addEventListener('scroll', () => {
    floatingBtns.style.opacity = '0';
    floatingBtns.style.pointerEvents = 'none';
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        floatingBtns.style.opacity = '1';
        floatingBtns.style.pointerEvents = 'auto';
    }, 1000);
});

// ═══════════════════════════════════════════════════
//  DESTINATION GALLERY SYSTEM
// ═══════════════════════════════════════════════════

const DESTINATIONS = [
    {
        id: 'mangrove',
        name: '🌿 Hutan Mangrove',
        tag: 'Alam',
        desc: 'Jelajahi ekosistem bakau yang rimbun',
        cover: 'assets/MANGROVE/img_3486.JPG.jpeg',
        photos: [
            'assets/MANGROVE/img_3486.JPG.jpeg',
            'assets/MANGROVE/img_3487.JPG.jpeg',
            'assets/MANGROVE/img_3488.JPG.jpeg',
            'assets/MANGROVE/img_3490.JPG.jpeg',
            'assets/MANGROVE/img_3496.JPG.jpeg',
            'assets/MANGROVE/img_3500.JPG.jpeg',
            'assets/MANGROVE/img_3507.JPG.jpeg',
            'assets/MANGROVE/img_3513.JPG.jpeg',
        ]
    },
    {
        id: 'awera',
        name: '🏖️ Pantai Awera',
        tag: 'Pantai',
        desc: 'Pasir putih dan ombak yang tenang',
        cover: 'assets/pantai awera/IMG_3567.PNG',
        photos: [
            'assets/pantai awera/IMG_3567.PNG',
            'assets/pantai awera/IMG_3568.PNG',
        ]
    },
    {
        id: 'tanjung-simakakang',
        name: '🌊 Tanjung Simakakang',
        tag: 'Tanjung',
        desc: 'Pemandangan tanjung yang spektakuler',
        cover: 'assets/TANJUNG SIMAKAKANG/IMG_2083.PNG',
        photos: [
            'assets/TANJUNG SIMAKAKANG/IMG_3587.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3587.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3588.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3589.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3591.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3592.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3593.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3594.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3595.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3596.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3597.PNG',
            'assets/TANJUNG SIMAKAKANG/IMG_3598.PNG',

        ]
    },
    {
        id: 'pulau-simakakang',
        name: '🏝️ Pulau Simakakang',
        tag: 'Pulau',
        desc: 'Snorkeling spot terbaik di Mentawai',
        cover: 'assets/simakakang/IMG_3571.PNG',
        photos: [
            'assets/simakakang/IMG_3570.PNG',
            'assets/simakakang/IMG_3571.PNG',
            'assets/simakakang/IMG_3572.PNG',
            'assets/simakakang/IMG_3573.PNG',
        ]
    },
    {
        id: 'siburu',
        name: '⛵ Pulau Siburu',
        tag: 'Pulau',
        desc: 'Pulau kecil nan romantis',
        cover: 'assets/SIBURU/IMG_3569.PNG',
        photos: [
            'assets/SIBURU/IMG_3569.PNG',
            'assets/SIBURU/IMG_3599.PNG',
            'assets/SIBURU/IMG_3600.PNG',
        ]
    },
    {
        id: 'putotoga',
        name: '🌺 Pulau Putotoga',
        tag: 'Pulau',
        desc: 'Keindahan alami yang belum banyak diketahui',
        cover: 'assets/PULAU PUTOTOGA/IMG_3396.JPG.jpeg',
        photos: ['assets/PULAU PUTOTOGA/IMG_3396.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3396.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3401.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3409.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3414.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3415.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3416.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3418.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3419.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3433.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3439.JPG.jpeg',
            'assets/PULAU PUTOTOGA/IMG_3550.PNG',
            'assets/PULAU PUTOTOGA/IMG_3551.PNG',
            'assets/PULAU PUTOTOGA/IMG_3552.PNG',
            'assets/PULAU PUTOTOGA/IMG_3554.PNG',
            'assets/PULAU PUTOTOGA/IMG_3555.PNG',

        ]
    },
    {
        id: 'spongebob',
        name: '🧽 Spongebob Island',
        tag: 'Viral',
        desc: 'Spot foto terpopuler di Mentawai',
        cover: 'assets/spongebob island/IMG_3558.PNG',
        photos: [
            'assets/spongebob island/IMG_3558.PNG',
            'assets/spongebob island/IMG_3559.PNG',
            'assets/spongebob island/IMG_3560.PNG',
            'assets/spongebob island/IMG_3561.PNG',
            'assets/spongebob island/IMG_3562.PNG',
            'assets/spongebob island/IMG_3563.PNG',
        ]
    },
    {
        id: 'jati-km0',
        name: '🌊 Pantai Jati KM 0',
        tag: 'Pantai',
        desc: 'Titik nol petualangan Mentawai',
        cover: 'assets/PANTAI JATI/IMG_3586.PNG',
        photos: ['assets/PANTAI JATI/IMG_3586.PNG',
            'assets/PANTAI JATI/IMG_3590.PNG',
        ]
    },
];

// ── Render Cards ──────────────────────────────────
(function renderDestCards() {
    const grid = document.getElementById('destGrid');
    if (!grid) return;

    DESTINATIONS.forEach((dest, i) => {
        const delay = (i * 0.05).toFixed(2);
        const card = document.createElement('div');
        card.className = 'dest-card reveal';
        card.style.transitionDelay = delay + 's';
        card.setAttribute('data-dest-id', dest.id);

        card.innerHTML = `
            <div class="dest-card-bg" style="background-image:url('${dest.cover}')"></div>
            <div class="dest-card-overlay"></div>
            <div class="dest-card-hover">
                <span class="dest-hover-label">
                    <i class="fa-regular fa-images"></i> Lihat Galeri
                </span>
            </div>
            <div class="dest-card-body">
                <span class="dest-card-tag">${dest.tag}</span>
                <div class="dest-card-name">${dest.name}</div>
                <div class="dest-card-meta">
                    <i class="fa-solid fa-camera"></i>
                    ${dest.photos.length} Foto
                </div>
            </div>
        `;

        card.addEventListener('click', () => openGallery(dest.id));
        grid.appendChild(card);
    });

    // Re-observe new cards for reveal animation
    const newCards = grid.querySelectorAll('.reveal');
    newCards.forEach(el => revealObserver.observe(el));
})();

// ── Gallery Modal ─────────────────────────────────
let gmCurrentDest = null;
let gmCurrentIndex = 0;
let gmTouchStartX = 0;

const galleryModal = document.getElementById('galleryModal');
const gmPhoto      = document.getElementById('gmPhoto');
const gmDestName   = document.getElementById('gmDestName');
const gmPhotoCount = document.getElementById('gmPhotoCount');
const gmPhotoIndex = document.getElementById('gmPhotoIndex');
const gmThumbs     = document.getElementById('gmThumbs');

function openGallery(destId) {
    const dest = DESTINATIONS.find(d => d.id === destId);
    if (!dest) return;

    gmCurrentDest  = dest;
    gmCurrentIndex = 0;

    gmDestName.textContent   = dest.name;
    gmPhotoCount.textContent = dest.photos.length + ' Foto';

    // Render thumbs
    gmThumbs.innerHTML = '';
    dest.photos.forEach((src, i) => {
        const t = document.createElement('div');
        t.className = 'gm-thumb' + (i === 0 ? ' active' : '');
        t.innerHTML = `<img src="${src}" alt="Foto ${i+1}" loading="lazy">`;
        t.addEventListener('click', () => setGmPhoto(i));
        gmThumbs.appendChild(t);
    });

    setGmPhoto(0);
    galleryModal.classList.add('open');
    document.body.classList.add('modal-open');
}

function closeGallery() {
    galleryModal.classList.remove('open');
    document.body.classList.remove('modal-open');
    gmCurrentDest = null;
}

function setGmPhoto(index) {
    if (!gmCurrentDest) return;
    const photos = gmCurrentDest.photos;
    gmCurrentIndex = (index + photos.length) % photos.length;

    gmPhoto.classList.add('loading');
    const img = new Image();
    img.onload = () => {
        gmPhoto.src = photos[gmCurrentIndex];
        gmPhoto.classList.remove('loading');
    };
    img.src = photos[gmCurrentIndex];

    gmPhotoIndex.textContent = (gmCurrentIndex + 1) + ' / ' + photos.length;

    // Update thumbs
    gmThumbs.querySelectorAll('.gm-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === gmCurrentIndex);
    });

    // Scroll active thumb into view
    const activeThumb = gmThumbs.querySelector('.gm-thumb.active');
    if (activeThumb) activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// Events
document.getElementById('gmClose').addEventListener('click', closeGallery);
document.getElementById('gmBack').addEventListener('click', closeGallery);
document.getElementById('gmBackdrop').addEventListener('click', closeGallery);
document.getElementById('gmPrev').addEventListener('click', () => setGmPhoto(gmCurrentIndex - 1));
document.getElementById('gmNext').addEventListener('click', () => setGmPhoto(gmCurrentIndex + 1));

// Keyboard
document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('open')) return;
    if (e.key === 'Escape')      closeGallery();
    if (e.key === 'ArrowRight')  setGmPhoto(gmCurrentIndex + 1);
    if (e.key === 'ArrowLeft')   setGmPhoto(gmCurrentIndex - 1);
});

// Swipe mobile
const gmPhotoWrap = document.querySelector('.gm-photo-wrap');
gmPhotoWrap.addEventListener('touchstart', e => {
    gmTouchStartX = e.touches[0].clientX;
}, { passive: true });
gmPhotoWrap.addEventListener('touchend', e => {
    const diff = gmTouchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? setGmPhoto(gmCurrentIndex + 1) : setGmPhoto(gmCurrentIndex - 1);
}, { passive: true });