document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        // Animate hamburger to X
        mobileMenuBtn.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Modal Gallery
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            modal.style.display = "block";
            const src = this.getAttribute('data-src');
            modalImg.src = src;

            // Allow scrolling removal
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    // Close modal when clicking outside image
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // 5. Initialize Flatpickr for Date Input
    if (typeof flatpickr !== 'undefined') {
        flatpickr("#date", {
            locale: "ru",
            minDate: "today",
            dateFormat: "d.m.Y",
            disableMobile: "true" // Use custom UI on mobile instead of native picker for consistency
        });
    }

    // 6. Booking Form Submission Simulation
    const bookingForm = document.getElementById('bookingForm');
    const successMessage = document.getElementById('bookingSuccess');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Here you would normally send data to a server
            // For now, we simulate success

            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = "Отправка...";
            submitBtn.disabled = true;

            setTimeout(() => {
                bookingForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                bookingForm.reset();
            }, 1000);
        });
    }

    // 6.5. Handle Reset Form Flow avoiding global scope
    const resetBookingBtn = document.getElementById('resetBookingBtn');
    if (resetBookingBtn) {
        resetBookingBtn.addEventListener('click', () => {
            successMessage.classList.add('hidden');
            bookingForm.classList.remove('hidden');
        });
    }

    // 7. Scroll Animations (Fade Up)
    const fadeElements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
