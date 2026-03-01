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

        function animateExitGrid() {
            const targetVelocity = isHoveringExit ? hoverVelocity : normalVelocity;

            currentVelocity += (targetVelocity - currentVelocity) * 0.05;

            gridPosX = (gridPosX + currentVelocity) % 40;
            gridPosY = (gridPosY - currentVelocity) % 40;

            exitGrid.style.backgroundPosition = `${gridPosX}px ${gridPosY}px`;

            requestAnimationFrame(animateExitGrid);
        }

        animateExitGrid();
    }
});