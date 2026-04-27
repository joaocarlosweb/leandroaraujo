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

    // --- CONFIGURAÇÃO INICIAL GSAP ---
    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
        console.error("GSAP ou ScrollTrigger não carregado corretamente.");
    }

    // FAIL-SAFE: Garante que o preloader suma mesmo se o JS travar
    setTimeout(() => {
        const loader = document.getElementById('preloader');
        if (loader && loader.style.display !== 'none') {
            gsap.to(loader, { yPercent: -100, duration: 0.5, ease: "power2.inOut" });
        }
    }, 2000);

    const mainTl = gsap.timeline();

    // 1. Animação do Preloader
    if (document.querySelector('.loader-progress')) {
        // Primeiro o nome Leandro Araujo aparece
        mainTl.from(".loader-content .logo", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        // Depois a barra de progresso enche
        .to(".loader-progress", {
            left: "0%",
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.2")
        // No final, a tela preta sobe
        .to("#preloader", {
            yPercent: -100,
            duration: 0.8,
            ease: "expo.inOut",
            onStart: () => {
                gsap.set("header", { opacity: 1, y: 0 });
            }
        });
    }

    // 2. Animação de Entrada do Site (Logo e Menu)
    mainTl.from(".logo", {
        y: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.4")
    // 3. Entrada triunfal do Título e Badge (O QUE A FACULDADE NÃO ENSINOU)
    .from(".hero-v2 .badge", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2")
    .from(".hero-v2 h1", {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3")
    // 4. RESTAURAR TODOS OS BOTÕES DA PÁGINA
    .from(".btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.4");

    // Efeitos Adicionais GSAP (Efeito Flutuante e Paralaxe)
    // Ícones flutuantes
    gsap.to(".sol-icon", {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.3
    });

    // Paralaxe na imagem do professor
    gsap.to(".about-image-v2 img", {
        scrollTrigger: {
            trigger: ".about-professor",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: -50,
        ease: "none"
    });

    // 3. Revelação durante o Scroll (ScrollTrigger)
    // Seção de Soluções (Grid Stagger)
    gsap.from(".sol-card", {
        scrollTrigger: {
            trigger: ".solution-v2",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Revelação individual para outros elementos
    const fadeUpElements = document.querySelectorAll('.price-box, .timeline-item, .slide-card, .about-content');
    
    fadeUpElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Efeito Magnético desativado momentaneamente para evitar conflitos de visibilidade
    // (Pode ser reativado após confirmarmos que os botões voltaram)

    updateSlider(); // Inicialização

    // Micro-interações de Hover nos Cards
    document.querySelectorAll('.sol-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                borderColor: "rgba(198, 255, 0, 0.6)",
                backgroundColor: "rgba(30, 30, 30, 0.8)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                borderColor: "rgba(255, 255, 255, 0.05)",
                backgroundColor: "rgba(30, 30, 30, 0.5)",
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

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
