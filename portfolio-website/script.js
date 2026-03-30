// This file is intentionally left blank.// ── YEAR ──────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── CUSTOM CURSOR ─────────────────────────
const cursor = document.createElement('div');
cursor.className = 'cursor';
const ring = document.createElement('div');
ring.className = 'cursor-ring';
document.body.appendChild(cursor);
document.body.appendChild(ring);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Cursor expand on hoverable elements
document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width  = '16px';
        cursor.style.height = '16px';
        ring.style.width    = '56px';
        ring.style.height   = '56px';
        ring.style.borderColor = 'rgba(200,240,74,0.6)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width  = '10px';
        cursor.style.height = '10px';
        ring.style.width    = '36px';
        ring.style.height   = '36px';
        ring.style.borderColor = 'rgba(200,240,74,0.4)';
    });
});

// ── NAV SCROLL STATE ──────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── REVEAL ON SCROLL ─────────────────────
const reveals = document.querySelectorAll('.project-card, .stat, .about-text p, .contact-inner > *');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ── SMOOTH ANCHOR SCROLL ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});