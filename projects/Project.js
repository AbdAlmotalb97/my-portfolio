document.addEventListener('DOMContentLoaded', function () {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselItems.length > 0) {
        let currentIndex = 0;
        let autoSlideInterval;

        // Create dots
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carousel-dot');

        // Show initial slide
        showSlide(currentIndex);
        startAutoSlide();

        // Next button click
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
            resetAutoSlide();
        });

        // Previous button click
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            showSlide(currentIndex);
            resetAutoSlide();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                showSlide(currentIndex);
                resetAutoSlide();
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
                showSlide(currentIndex);
                resetAutoSlide();
            }
        });

        // Pause on hover
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }

        function showSlide(index) {
            carouselItems.forEach(item => item.classList.remove('active'));
            carouselItems[index].classList.add('active');

            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }

        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
            resetAutoSlide();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                showSlide(currentIndex);
            }, 3000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
    }
});
