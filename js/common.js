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
