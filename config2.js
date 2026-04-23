// Lógica para a Landing Page V2 - Slider 1 por 1 com Loop Infinito

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.slide');
    
    let currentIndex = 0;
    let autoPlayActive = true;
    
    function getVisibleSlides() {
        if (window.innerWidth >= 1100) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateSlider() {
        const visibleSlides = getVisibleSlides();
        const totalSlides = slides.length;

        // LÓGICA DE LOOP INFINITO:
        // Se ultrapassar o último slide possível, volta para o primeiro
        if (currentIndex > totalSlides - visibleSlides) {
            currentIndex = 0;
        }
        // Se for menor que zero, vai para o último grupo possível
        if (currentIndex < 0) {
            currentIndex = totalSlides - visibleSlides;
        }

        const offset = -(currentIndex * (100 / visibleSlides));
        slider.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentIndex++; // Move 1 por 1
        updateSlider();
    }

    function prevSlide() {
        currentIndex--; // Move 1 por 1
        updateSlider();
    }

    // Eventos de Clique nas Setas
    nextBtn.addEventListener('click', () => {
        autoPlayActive = false; // Para o autoplay no clique
        nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        autoPlayActive = false; // Para o autoplay no clique
        prevSlide();
    });

    // Parar autoplay ao clicar no slider
    slider.addEventListener('click', () => {
        autoPlayActive = false;
    });

    // Autoplay - 4 segundos
    setInterval(() => {
        if (autoPlayActive) {
            nextSlide();
        }
    }, 4000);

    // Reajustar layout ao mudar tamanho da tela
    window.addEventListener('resize', () => {
        currentIndex = 0; // Resetar para evitar bugs de cálculo
        updateSlider();
    });

    // --- ANIMAÇÕES DE REVELAÇÃO ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.sol-card, .price-box, .video-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    updateSlider(); // Inicialização

    // --- LÓGICA DE CURSOR GLOW REFINADO (COM LAG) ---
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Interpolação para criar o efeito de "lag" (atraso suave)
        // O valor 0.1 define a velocidade do acompanhamento (menor = mais lag)
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // --- LÓGICA DO HEADER SCROLL ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- LÓGICA DO FAQ (ACORDEÃO) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Fechar outros itens (opcional, remova se quiser permitir vários abertos)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Alternar o item atual
            item.classList.toggle('active');
        });
    });

    // --- LÓGICA DE SCROLL SUAVE PARA LINKS INTERNOS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios ou apenas '#'
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 85; // Altura do cabeçalho + margem
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
