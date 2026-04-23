// Interatividade da Landing Page

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeito do Header ao rolar a página
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(8, 8, 8, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(8, 8, 8, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // 2. Animação de entrada (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Selecionando elementos para animar
    const animatedElements = document.querySelectorAll('.pain-card, .solution-text, .price-box, .course-module');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // 3. Suavização de âncoras (Scroll Suave já está no CSS, mas reforçamos aqui se necessário)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    console.log('Landing Page Expert Personal carregada com sucesso! 🚀');
});
