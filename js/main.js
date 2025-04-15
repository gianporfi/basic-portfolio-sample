/*--------------------------------------------------------------
# Main JavaScript File
--------------------------------------------------------------*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initPreloader();
    initCursor();
    initHeader();
    initMobileMenu();
    initPortfolioFilter();
    initSkillsProgress();
    initTestimonialSlider();
    initContactForm();
    initScrollReveal();
});

/*--------------------------------------------------------------
# Preloader
--------------------------------------------------------------*/
function initPreloader() {
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    if (!loader) return;
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        loaderProgress.style.strokeDashoffset = 251.2 * (1 - progress / 100);
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Trigger animations after preloader
                    document.body.classList.add('loaded');
                }, 500);
            }, 500);
        }
    }, 20);
}

/*--------------------------------------------------------------
# Custom Cursor
--------------------------------------------------------------*/
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    // Check if the device supports hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    
    if (!supportsHover) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add cursor effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .skill-card, .contact-card, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.5';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/*--------------------------------------------------------------
# Header Scroll Effect
--------------------------------------------------------------*/
function initHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initial check
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
}

/*--------------------------------------------------------------
# Mobile Menu Toggle
--------------------------------------------------------------*/
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('show');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('show');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('show');
            document.body.classList.remove('menu-open');
        });
    });
}

/*--------------------------------------------------------------
# Portfolio Filter
--------------------------------------------------------------*/
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to current button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/*--------------------------------------------------------------
# Skills Progress Animation
--------------------------------------------------------------*/
function initSkillsProgress() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (!progressBars.length) return;
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Animate progress bar when in viewport
    function animateProgressBars() {
        progressBars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }
    
    // Initial check
    animateProgressBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateProgressBars);
}

/*--------------------------------------------------------------
# Testimonial Slider
--------------------------------------------------------------*/
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    if (!testimonialItems.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    const maxIndex = testimonialItems.length - 1;
    
    // Show only the first testimonial on mobile, all on desktop
    function updateTestimonials() {
        const isMobile = window.innerWidth < 768;
        
        testimonialItems.forEach((item, index) => {
            if (isMobile) {
                item.style.display = index === currentIndex ? 'block' : 'none';
            } else {
                item.style.display = 'block';
            }
        });
    }
    
    // Initial setup
    updateTestimonials();
    
    // Update on window resize
    window.addEventListener('resize', updateTestimonials);
    
    // Next button click
    nextButton.addEventListener('click', () => {
        if (window.innerWidth >= 768) return; // Only work on mobile
        
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateTestimonials();
    });
    
    // Previous button click
    prevButton.addEventListener('click', () => {
        if (window.innerWidth >= 768) return; // Only work on mobile
        
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateTestimonials();
    });
}

/*--------------------------------------------------------------
# Contact Form Validation
--------------------------------------------------------------*/
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        // Simple validation
        let isValid = true;
        
        if (!nameField.value.trim()) {
            markInvalid(nameField, 'Il nome è obbligatorio');
            isValid = false;
        } else {
            markValid(nameField);
        }
        
        if (!emailField.value.trim()) {
            markInvalid(emailField, 'L\'email è obbligatoria');
            isValid = false;
        } else if (!isValidEmail(emailField.value)) {
            markInvalid(emailField, 'Inserisci un\'email valida');
            isValid = false;
        } else {
            markValid(emailField);
        }
        
        if (!subjectField.value.trim()) {
            markInvalid(subjectField, 'L\'oggetto è obbligatorio');
            isValid = false;
        } else {
            markValid(subjectField);
        }
        
        if (!messageField.value.trim()) {
            markInvalid(messageField, 'Il messaggio è obbligatorio');
            isValid = false;
        } else {
            markValid(messageField);
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Invio in corso...';
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = 'Messaggio inviato con successo! Ti risponderò il prima possibile.';
                contactForm.appendChild(successMessage);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
            }, 1500);
        }
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Mark field as invalid
    function markInvalid(field, message) {
        const wrapper = field.closest('.input-wrapper');
        wrapper.classList.add('error');
        
        // Check if error message already exists
        let errorMsg = wrapper.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            wrapper.parentNode.insertBefore(errorMsg, wrapper.nextSibling);
        }
        
        errorMsg.innerHTML = message;
        errorMsg.style.display = 'block';
    }
    
    // Mark field as valid
    function markValid(field) {
        const wrapper = field.closest('.input-wrapper');
        wrapper.classList.remove('error');
        
        const errorMsg = wrapper.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'none';
        }
    }
    
    // Add input event listeners to clear errors when typing
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            const wrapper = field.closest('.input-wrapper');
            wrapper.classList.remove('error');
            
            const errorMsg = wrapper.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.style.display = 'none';
            }
        });
    });
}

/*--------------------------------------------------------------
# Scroll Reveal Animation
--------------------------------------------------------------*/
function initScrollReveal() {
    // Target elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.hero-content, .section-header, .portfolio-card, .skill-card, ' +
        '.about-image, .about-text, .timeline-item, .testimonial-card, ' +
        '.contact-card, .contact-form'
    );
    
    if (!animatedElements.length) return;
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Animate elements when in viewport
    function animateElements() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles
    animatedElements.forEach(element => {
        if (!element.classList.contains('animated')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    });
    
    // Initial check
    setTimeout(animateElements, 100); // Delay to ensure initial styles are applied
    
    // Check on scroll
    window.addEventListener('scroll', animateElements);
}