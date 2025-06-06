document.addEventListener('DOMContentLoaded', function () {
    // =============================================
    // CARROSSEL PRINCIPAL (COM AUTOPLAY E YOUTUBE)
    // =============================================
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let currentIndex = 0;
    let autoSlideInterval;
    let players = {};

    // Carregar a API do YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Função para criar os players do YouTube
    window.onYouTubeIframeAPIReady = function () {
        players.vaporWillie = new YT.Player('vaporWillieVideo');
        players.bettyBoop = new YT.Player('bettyBoopVideo');
        players.popeye = new YT.Player('popeyeVideo');
        players.picaPau = new YT.Player('picaPauVideo');
    };

    // Criar dots para o carrossel
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Iniciar autoplay
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 8000);
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // Pausar todos os vídeos
    function pauseAllVideos() {
        for (const player in players) {
            if (players[player].pauseVideo) {
                players[player].pauseVideo();
            }
        }
    }

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        pauseAllVideos();

        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Reiniciar autoplay
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Pausar autoplay com mouse
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', startAutoSlide);

    // Iniciar
    startAutoSlide();

    // =============================================
    // CARROSSEIS SECUNDÁRIOS (ANTIGAS, ANIMAÇÕES, ANIMES)
    // =============================================
    function setupSecondaryCarousel(container) {
        const track = container.querySelector('.antigas-carousel-track');
        const slides = container.querySelectorAll('.antigas-carousel-slide');
        const prevBtn = container.querySelector('.antigas-carousel-btn.prev');
        const nextBtn = container.querySelector('.antigas-carousel-btn.next');

        let currentIndex = 0;

        function updateCarousel() {
            if (slides.length === 0) return;

            const slideWidth = slides[0].getBoundingClientRect().width + 15;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        // Inicializar
        updateCarousel();

        // Ajustar ao redimensionar
        window.addEventListener('resize', updateCarousel);
    }

    // Configurar todos os carrosséis secundários
    document.querySelectorAll('.antigas-carousel-container').forEach(container => {
        setupSecondaryCarousel(container);
    });
});