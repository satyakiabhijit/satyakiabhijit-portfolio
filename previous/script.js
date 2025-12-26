document.addEventListener('DOMContentLoaded', function() {

    // Loading Screen
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1200);
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle (built-in .nav-toggle)
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        // Accessibility attributes
        navToggle.setAttribute('role', 'button');
        navToggle.setAttribute('tabindex', '0');
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-controls', 'nav-links');
        navToggle.setAttribute('aria-expanded', 'false');

        function toggleNav() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            const expanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');

            // Prevent body scroll when menu is open
            document.body.style.overflow = expanded ? 'hidden' : 'auto';
        }

        navToggle.addEventListener('click', toggleNav);

        // Keyboard support
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleNav();
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Counter Animation with Intersection Observer
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        counterObserver.observe(statsContainer);
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const increment = target / 100;
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.innerText = target + '+';
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(count);
                }
            }, 30);
        });
    }

    // Trigger counter animation on scroll
    function checkCounters() {
        const statsSection = document.querySelector('.stats-container');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounters();
                window.removeEventListener('scroll', checkCounters);
            }
        }
    }

    window.addEventListener('scroll', checkCounters);

    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('header .nav-links a, .footer-links a');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    allNavLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Portfolio filtering functionality
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            console.log('Filter clicked:', filterValue); // Debug log

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                console.log('Item category:', itemCategory); // Debug log
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    // Show item
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Hide item
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio item hover effect
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });

    // Form validation with CAPTCHA and open Gmail
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = this.querySelector('input[placeholder="Name"]');
            const emailInput = this.querySelector('input[placeholder="Email"]');
            const telephoneInput = this.querySelector('input[placeholder="Telephone"]');
            const subjectInput = this.querySelector('input[placeholder="Project Subject"]');
            const messageInput = this.querySelector('textarea');
            const captchaInput = document.getElementById('captcha');

            let isValid = true;
            const inputs = [nameInput, emailInput, telephoneInput, subjectInput, messageInput];

            // Validate regular form fields
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
            });

            // Validate email format
            if (emailInput.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.style.border = '1px solid red';
                }
            }

            // Validate CAPTCHA
            const isCaptchaValid = validateCaptcha();
            if (!isCaptchaValid) {
                isValid = false;
            }

            if (isValid) {
                const recipientEmail = 'abhijitsatyaki29@gmail.com';
                const subject = subjectInput.value.trim();
                const body = `Name: ${nameInput.value.trim()}
Contact Details:
Email: ${emailInput.value.trim()}
Telephone: ${telephoneInput.value.trim()}

Message:
${messageInput.value.trim()}`;

                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.open(gmailLink, '_blank');
                
                // Show success message
                const feedback = document.getElementById('captcha-feedback');
                feedback.className = 'captcha-feedback success';
                feedback.textContent = '✓ Message sent successfully! Redirecting to Gmail...';
                
                setTimeout(() => {
                    contactForm.reset();
                    generateCaptcha(); // Generate new CAPTCHA after form reset
                }, 2000);
            } else {
                alert('Please fill in all the required fields correctly and complete the security verification.');
            }
        });
    }

    // Sticky header with scroll effect
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;

        // Highlight active section in navigation
        const sections = document.querySelectorAll('section');
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                const id = section.getAttribute('id');
                if (id) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });

    // Removed legacy/dynamic hamburger injection to avoid duplicate nav icons.

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .skill-item, .portfolio-item, .about-image, .about-text');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }

    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .service-card, .skill-item, .portfolio-item, .about-image, .about-text {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .service-card.animate, .skill-item.animate, .portfolio-item.animate, .about-image.animate, .about-text.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .hero-text {
            animation: fadeInUp 1s ease forwards;
        }

        .hero-image {
            animation: fadeInRight 1s ease forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        header.scrolled {
            background-color: rgba(0, 0, 0, 0.95);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(animationStyles);

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Stat number animation
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateNumbers() {
        statNumbers.forEach(stat => {
            const value = parseInt(stat.textContent);
            let startValue = 0;
            const duration = 2000;
            const startTime = Date.now();

            function updateNumber() {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;

                if (elapsed < duration) {
                    const progress = elapsed / duration;
                    const currentValue = Math.floor(progress * value);
                    stat.textContent = currentValue + "+";
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = value + "+";
                }
            }

            updateNumber();
        });
    }

    function checkStatsSection() {
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            const statsSectionPosition = statsContainer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (statsSectionPosition < windowHeight - 100) {
                animateNumbers();
                window.removeEventListener('scroll', checkStatsSection);
            }
        }
    }

    window.addEventListener('scroll', checkStatsSection);
    checkStatsSection();

    // Skill bar animation
    const skillPercentages = document.querySelectorAll('.skill-percentage');

    function animateSkills() {
        skillPercentages.forEach(skill => {
            const percentage = parseInt(skill.textContent);
            skill.style.width = '0%';

            setTimeout(() => {
                skill.style.transition = 'width 1.5s ease';
                skill.style.width = percentage + '%';
            }, 200);
        });
    }

    function checkSkillsSection() {
        const skillsContainer = document.querySelector('.skills-container');
        if (skillsContainer) {
            const skillsSectionPosition = skillsContainer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (skillsSectionPosition < windowHeight - 100) {
                animateSkills();
                window.removeEventListener('scroll', checkSkillsSection);
            }
        }
    }

    window.addEventListener('scroll', checkSkillsSection);
    checkSkillsSection();

    // Typing text effect
    const typingElement = document.getElementById('typing-text');
    const titles = ['Front-End Developer', 'MERN Stack Developer', 'UI/UX Enthusiast', 'AI/ML Engineer'];
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const pauseBeforeDelete = 1500;

    function typeEffect() {
        const currentTitle = titles[currentTitleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, currentCharIndex--);
        } else {
            typingElement.textContent = currentTitle.substring(0, currentCharIndex++);
        }

        if (!isDeleting && currentCharIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseBeforeDelete);
            return;
        }

        if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        }

        setTimeout(typeEffect, isDeleting ? deleteSpeed : typingSpeed);
    }

    typeEffect();

});

document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".testimonials-slider", {
        loop: true,
        autoplay: {
            delay: 3000, // Auto-scroll every 4 seconds
            disableOnInteraction: false
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
});

// Manual CAPTCHA functionality
let captchaAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    
    captchaAnswer = num1 + num2;
    
    // Clear previous input and feedback
    const captchaInput = document.getElementById('captcha');
    const feedback = document.getElementById('captcha-feedback');
    
    if (captchaInput) {
        captchaInput.value = '';
        captchaInput.classList.remove('success', 'error');
    }
    
    if (feedback) {
        feedback.className = 'captcha-feedback';
        feedback.textContent = '';
    }
}

function validateCaptcha() {
    const userAnswer = parseInt(document.getElementById('captcha').value);
    const feedback = document.getElementById('captcha-feedback');
    const captchaInput = document.getElementById('captcha');
    
    if (userAnswer === captchaAnswer) {
        feedback.className = 'captcha-feedback success';
        feedback.textContent = '✓ Correct! You are verified.';
        captchaInput.classList.remove('error');
        captchaInput.classList.add('success');
        return true;
    } else {
        feedback.className = 'captcha-feedback error';
        feedback.textContent = '✗ Incorrect answer. Please try again.';
        captchaInput.classList.remove('success');
        captchaInput.classList.add('error');
        return false;
    }
}

// Initialize CAPTCHA when page loads
document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
    
    // Add CAPTCHA validation to input
    const captchaInput = document.getElementById('captcha');
    if (captchaInput) {
        captchaInput.addEventListener('input', validateCaptcha);
        captchaInput.addEventListener('blur', validateCaptcha);
    }
});