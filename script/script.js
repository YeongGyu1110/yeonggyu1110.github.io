const glow = document.querySelector('.cursor-glow');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let curX = mouseX;
let curY = mouseY;
const speed = 0.08;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    function animate() {
        curX += (mouseX - curX) * speed;
        curY += (mouseY - curY) * speed;
        glow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animate);
    }
    animate();
} else {
    glow.style.display = 'none';
}

document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    glow.style.opacity = '0.8';
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

document.addEventListener("DOMContentLoaded", () => {
    const archiveBanner = document.querySelector('.archive-banner');
    const archiveGrid = document.querySelector('.archive-bg-grid');

    if (archiveBanner && archiveGrid) {
        let gridPosX = 0;
        let gridPosY = 0;

        let currentVelocity = 0.5;
        const normalVelocity = 0.5;
        const hoverVelocity = 1.5;

        let isHoveringArchive = false;

        archiveBanner.addEventListener('mouseenter', () => {
            isHoveringArchive = true;
        });

        archiveBanner.addEventListener('mouseleave', () => {
            isHoveringArchive = false;
        });


        let isArchiveVisible = false;

        const observerOptions = {
            root: null,
            rootMargin: "50px",
            threshold: 0
        };

        const archiveObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!isArchiveVisible) {
                    isArchiveVisible = true;
                    animateArchiveGrid(); 
                }
            } else {
                isArchiveVisible = false; 
            }
        }, observerOptions);

        archiveObserver.observe(archiveBanner);

        function animateArchiveGrid() {
            if (!isArchiveVisible || prefersReducedMotion) return; 

            const targetVelocity = isHoveringArchive ? hoverVelocity : normalVelocity;
            currentVelocity += (targetVelocity - currentVelocity) * 0.05;

            gridPosX = (gridPosX - currentVelocity) % 40;
            gridPosY = (gridPosY + currentVelocity) % 40;

            archiveGrid.style.backgroundPosition = `${gridPosX}px ${gridPosY}px`;

            requestAnimationFrame(animateArchiveGrid);
        }
        
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const marqueeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const tracks = entry.target.querySelectorAll('.marquee-track');
            if (entry.isIntersecting) {
                tracks.forEach(track => track.style.animationPlayState = 'running');
            } else {
                tracks.forEach(track => track.style.animationPlayState = 'paused');
            }
        });
    }, { rootMargin: "50px" });

    document.querySelectorAll('.tech-marquee').forEach(el => {
        marqueeObserver.observe(el);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const topLinks = document.querySelectorAll('a[href="#top"]');

    topLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            document.body.setAttribute('tabindex', '-1');
            document.body.focus({ preventScroll: true });
            
            document.body.addEventListener('blur', () => {
                document.body.removeAttribute('tabindex');
            }, { once: true });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const internalLinks = document.querySelectorAll('.skip-link, .scroll-down');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                targetElement.focus({ preventScroll: true });
            }
        });
    });
});