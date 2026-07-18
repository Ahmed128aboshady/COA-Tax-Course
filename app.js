/* ==========================================
   TAX LANDING PAGE - INTERACTIVE SCRIPT (JS)
   Features: Countdown, Accordion, Slider, WhatsApp Form, Theme Toggle
   Author: COA Tech / Antigravity
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. Theme Switcher (Light / Dark Theme)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('tax_theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            let theme = 'light';
            if (document.body.classList.contains('dark-theme')) {
                theme = 'dark';
            }
            
            localStorage.setItem('tax_theme', theme);
            
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
    
    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // ==========================================
    // 2. Course Launch Countdown Timer (July 27, 2026 at 7:00 PM)
    // ==========================================
    const countdownTarget = new Date('2026-07-27T19:00:00+03:00').getTime();

    const timerElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        miniDays: document.getElementById('miniDays'),
        miniHours: document.getElementById('miniHours'),
        miniMinutes: document.getElementById('miniMinutes'),
        miniSeconds: document.getElementById('miniSeconds')
    };

    function updateTimer() {
        const now = new Date().getTime();
        const difference = countdownTarget - now;

        if (difference <= 0) {
            Object.values(timerElements).forEach(el => {
                if (el) el.textContent = '00';
            });
            const countdownHeader = document.querySelector('.countdown-wrapper h3');
            if (countdownHeader) {
                countdownHeader.textContent = 'الراوند الضريبي انطلق بالفعل! احجز الآن للحاق بالمحاضرات.';
            }
            const miniTimerText = document.querySelector('.hero-urgency span');
            if (miniTimerText) {
                miniTimerText.textContent = 'الراوند الضريبي بدأ بالفعل! احجز مقعدك الآن:';
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const format = (num) => num.toString().padStart(2, '0');

        if (timerElements.days) timerElements.days.textContent = format(days);
        if (timerElements.hours) timerElements.hours.textContent = format(hours);
        if (timerElements.minutes) timerElements.minutes.textContent = format(minutes);
        if (timerElements.seconds) timerElements.seconds.textContent = format(seconds);

        if (timerElements.miniDays) timerElements.miniDays.textContent = format(days);
        if (timerElements.miniHours) timerElements.miniHours.textContent = format(hours);
        if (timerElements.miniMinutes) timerElements.miniMinutes.textContent = format(minutes);
        if (timerElements.miniSeconds) timerElements.miniSeconds.textContent = format(seconds);
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    // ==========================================
    // 3. Syllabus & FAQ Accordion Logic
    // ==========================================
    const syllabusItems = document.querySelectorAll('.syllabus .accordion-item');
    syllabusItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            syllabusItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // ==========================================
    // 4. Stats Counter Animation on Scroll
    // ==========================================
    const statsBar = document.querySelector('.stats-bar');
    const statNums = document.querySelectorAll('.stat-num');
    let counted = false;

    function startCounting() {
        statNums.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10);
            const duration = 1800; 
            const stepTime = Math.max(Math.floor(duration / target), 10);
            let current = 0;
            
            const timer = setInterval(() => {
                if (target < 50) {
                    current += 1;
                } else {
                    current += Math.ceil(target / 100);
                }
                
                if (current >= target) {
                    num.textContent = target.toLocaleString('en-US');
                    clearInterval(timer);
                } else {
                    num.textContent = current.toLocaleString('en-US');
                }
            }, stepTime);
        });
    }

    if (statsBar && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    startCounting();
                    counted = true;
                    observer.unobserve(statsBar);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(statsBar);
    } else {
        setTimeout(startCounting, 1000);
    }

    // ==========================================
    // 5. Testimonials Slider / Carousel
    // ==========================================
    const carousel = document.getElementById('testimonialsCarousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (carousel && slides.length > 0) {
        if (nextBtn) nextBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); }); 
        if (prevBtn) prevBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); }); 
        
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const targetIdx = parseInt(e.target.getAttribute('data-slide'), 10);
                showSlide(targetIdx);
                resetAutoplay();
            });
        });

        startAutoplay();

        function startAutoplay() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoplay() {
            clearInterval(slideInterval);
            startAutoplay();
        }

        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', startAutoplay);
    }

    // ==========================================
    // 6. Booking Form Validation & WhatsApp Integration
    // ==========================================
    const bookingForm = document.getElementById('taxBookingForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalRedirectBtn = document.getElementById('modalRedirectBtn');
    
    let generatedWhatsAppUrl = '';

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const accountingLevelEl = document.getElementById('accountingLevel');
            const accountingLevel = accountingLevelEl.options[accountingLevelEl.selectedIndex].text;
            const learningTypeEl = document.getElementById('learningType');
            const learningType = learningTypeEl.options[learningTypeEl.selectedIndex].text;
            
            if (fullName === '' || phoneNumber === '') {
                alert('من فضلك املأ الحقول المطلوبة.');
                return;
            }

            // Create WhatsApp Custom Text Message
            const academyNumber = '201013907174'; 
            const baseMessage = `السلام عليكم يا أكاديمية COA، أنا مهتم بكورس الضرائب الشامل للدكتور أحمد ماهر.
تفاصيل بياناتي:
- الاسم: ${fullName}
- الهاتف: ${phoneNumber}
- مستواي المحاسبي: ${accountingLevel}
- طريقة الدراسة المفضلة: ${learningType}

أرغب في الاستفادة من خصم الراوند والحصول على الماتريال وتفعيل حسابي.`;

            const encodedMessage = encodeURIComponent(baseMessage);
            generatedWhatsAppUrl = `https://wa.me/${academyNumber}?text=${encodedMessage}`;

            if (successModal) {
                successModal.classList.add('active');
            } else {
                window.open(generatedWhatsAppUrl, '_blank');
            }
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    if (modalRedirectBtn) {
        modalRedirectBtn.addEventListener('click', () => {
            window.open(generatedWhatsAppUrl, '_blank');
            successModal.classList.remove('active');
            if (bookingForm) bookingForm.reset();
        });
    }

    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});
