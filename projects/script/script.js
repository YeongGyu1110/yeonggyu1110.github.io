document.addEventListener("DOMContentLoaded", () => {
    const exitBanner = document.querySelector('.exit-banner');
    const exitGrid = document.querySelector('.exit-banner .archive-bg-grid');

    if (exitBanner && exitGrid) {
        let gridPosX = 0;
        let gridPosY = 0;

        let currentVelocity = 1.5;
        const normalVelocity = 1.5;
        const hoverVelocity = 0.5;

        let isHoveringExit = false;

        exitBanner.addEventListener('mouseenter', () => {
            isHoveringExit = true;
        });

        exitBanner.addEventListener('mouseleave', () => {
            isHoveringExit = false;
        });

        let isExitVisible = false;

        const exitObserverOptions = {
            rootMargin: "50px", 
            threshold: 0
        };

        const exitObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!isExitVisible) {
                    isExitVisible = true;
                    animateExitGrid();
                }
            } else {
                isExitVisible = false;
            }
        }, exitObserverOptions);

        exitObserver.observe(exitBanner);

        function animateExitGrid() {
            if (!isExitVisible) return;

            const targetVelocity = isHoveringExit ? hoverVelocity : normalVelocity;
            currentVelocity += (targetVelocity - currentVelocity) * 0.05;

            gridPosX = (gridPosX + currentVelocity) % 40;
            gridPosY = (gridPosY - currentVelocity) % 40;

            exitGrid.style.backgroundPosition = `${gridPosX}px ${gridPosY}px`;

            requestAnimationFrame(animateExitGrid);
        }
        
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const headerMarqueeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const tracks = entry.target.querySelectorAll('.marquee-track');
            if (entry.isIntersecting) {
                tracks.forEach(track => track.style.animationPlayState = 'running');
            } else {
                tracks.forEach(track => track.style.animationPlayState = 'paused');
            }
        });
    });

    const marqueeWrapper = document.querySelector('.marquee-wrapper');
    if (marqueeWrapper) {
        headerMarqueeObserver.observe(marqueeWrapper);
    }
});

const scrollLinks = document.querySelectorAll('.folder-tab');
scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const topLinks = document.querySelectorAll('nav a[href="#"]');

    topLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});