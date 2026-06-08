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
function toggleWhyCard(card) {
    const isOpen = card.classList.contains('open');
    document.querySelectorAll('.why-card').forEach(c => c.classList.remove('open'));
    if (!isOpen) card.classList.add('open');
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