const glow = document.querySelector('.cursor-glow');
const dot = document.querySelector('.cursor-dot');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let curX = mouseX;
let curY = mouseY;
const speed = 0.08;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animate() {
    curX += (mouseX - curX) * speed;
    curY += (mouseY - curY) * speed;
    glow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
}
animate();

document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    dot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    glow.style.opacity = '0.8';
    dot.style.opacity = '1';
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stats-container')) {
                    const bars = entry.target.querySelectorAll('.stat-bar-fill');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-card, .reveal-img, .reveal-item, .stats-container');
    revealElements.forEach(el => observer.observe(el));
});