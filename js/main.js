document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        mainNav.classList.toggle('active');
        this.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('fa-times');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Hero Slider
    const heroSlider = document.querySelector('.hero-slider');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[index].classList.add('active');
        currentSlide = index;
        updateSliderDots();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    function createSliderDots() {
        const dotsContainer = document.querySelector('.slider-dots');
        dotsContainer.innerHTML = '';
        
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    function updateSliderDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    sliderPrev.addEventListener('click', () => {
        prevSlide();
        stopSlider();
        startSlider();
    });
    
    sliderNext.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });
    
    heroSlider.addEventListener('mouseenter', stopSlider);
    heroSlider.addEventListener('mouseleave', startSlider);
    
    createSliderDots();
    startSlider();
    
    // Services Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
        updateTestimonialDots();
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function createTestimonialDots() {
        const dotsContainer = document.querySelector('.testimonial-dots');
        dotsContainer.innerHTML = '';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === currentTestimonial) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    function updateTestimonialDots() {
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    testimonialPrev.addEventListener('click', prevTestimonial);
    testimonialNext.addEventListener('click', nextTestimonial);
    
    createTestimonialDots();
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open current item if it was closed
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Animated Counters
    const counters = document.querySelectorAll('.stat-number');
    const aboutSection = document.querySelector('.about-section');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 16ms per frame
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        countersAnimated = true;
    }
    
    // Intersection Observer for counters and animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === aboutSection) {
                    animateCounters();
                }
                
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .service-card, .process-step, .blog-card').forEach(element => {
        observer.observe(element);
    });
    observer.observe(aboutSection);
    
    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate name
            const nameInput = this.querySelector('#name');
            if (nameInput.value.trim() === '') {
                setError(nameInput, 'الاسم مطلوب');
                isValid = false;
            } else {
                clearError(nameInput);
            }
            
            // Validate phone
            const phoneInput = this.querySelector('#phone');
            const phoneRegex = /^[0-9]{10,15}$/;
            if (phoneInput.value.trim() === '') {
                setError(phoneInput, 'رقم الهاتف مطلوب');
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                setError(phoneInput, 'رقم هاتف غير صالح');
                isValid = false;
            } else {
                clearError(phoneInput);
            }
            
            // Validate email if provided
            const emailInput = this.querySelector('#email');
            if (emailInput.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    setError(emailInput, 'بريد إلكتروني غير صالح');
                    isValid = false;
                } else {
                    clearError(emailInput);
                }
            }
            
            // Validate service
            const serviceInput = this.querySelector('#service');
            if (serviceInput.value === '') {
                setError(serviceInput, 'الخدمة مطلوبة');
                isValid = false;
            } else {
                clearError(serviceInput);
            }
            
            // Validate message
            const messageInput = this.querySelector('#message');
            if (messageInput.value.trim() === '') {
                setError(messageInput, 'وصف المشكلة مطلوب');
                isValid = false;
            } else {
                clearError(messageInput);
            }
            
            if (isValid) {
                // Form is valid, submit it (in a real app, you would send to server)
                alert('تم استلام طلبك بنجاح! سنتواصل معك في أقرب وقت.');
                this.reset();
            }
        });
        
        function setError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            formGroup.classList.add('error');
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
        
        function clearError(input) {
            const formGroup = input.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            formGroup.classList.remove('error');
            errorMessage.style.display = 'none';
        }
    }
    
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
       const lazyImages = document.querySelectorAll('img[loading="lazy"]');
lazyImages.forEach(img => {
    if (img.dataset.src) {
        img.src = img.dataset.src;
    }
});
    } else {
        // Fallback for browsers without native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    lazyLoadObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
});