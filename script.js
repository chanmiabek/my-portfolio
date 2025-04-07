// Navigation scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing animation for the introduction
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
};

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const h2Element = document.querySelector('.home-container h2');
    if (h2Element) {
        h2Element.innerHTML = '';
        typeWriter(h2Element, "I'm a Software Developer");
    }
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'all 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '☰';
document.querySelector('header').appendChild(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.about, .project-content, .blog-container, .contact-section');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Form validation for contact form
const validateForm = (formElement) => {
    const emailInput = formElement.querySelector('input[type="email"]');
    const messageInput = formElement.querySelector('textarea');

    let isValid = true;

    if (emailInput && !emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailInput.classList.add('error');
        isValid = false;
    }

    if (messageInput && messageInput.value.length < 10) {
        messageInput.classList.add('error');
        isValid = false;
    }

    return isValid;
};

// Dark mode toggle
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '🌓';
    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
};

createDarkModeToggle();

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');

    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    images.forEach(lazyLoad);
});

// Hide/Show navbar on scroll
let lastScroll = 0;
const header = document.querySelector('.header');
const scrollThreshold = 100; // Minimum scroll before hiding/showing

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Show/hide based on scroll direction
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scrolling down & past threshold - hide navbar
        header.classList.add('hide');
    } else {
        // Scrolling up or at top - show navbar
        header.classList.remove('hide');
    }

    lastScroll = currentScroll;
});

// Show navbar when hovering near top of screen
document.addEventListener('mousemove', (e) => {
    if (e.clientY <= 50) {
        header.classList.remove('hide');
    }
});
