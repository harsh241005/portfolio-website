// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Smooth navigation click behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Apply brand colors to skill pill dots
    document.querySelectorAll('.pill-dot[data-color]').forEach(dot => {
        const color = dot.getAttribute('data-color');
        dot.style.background = color;
        dot.style.color = color;
    });

    // Custom Magnetic Cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor && window.innerWidth > 768) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let rafId = null;

        const updateCursor = () => {
            cursor.style.setProperty('--cursor-x', `${mouseX}px`);
            cursor.style.setProperty('--cursor-y', `${mouseY}px`);
            rafId = null;
        };
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!rafId) rafId = requestAnimationFrame(updateCursor);
        });

        updateCursor();

        const clickables = document.querySelectorAll('a, button, .project-card, .btn');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
});
