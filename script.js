// Interactive Features for DJDinn Links Site

// Add ripple effect on link clicks
document.querySelectorAll('.social-link, .mix-card, .event-button, .btn').forEach(element => {
    element.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Clear existing ripples
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Could add modal close or other escape functionality
        console.log('Escape key pressed');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollPosition = window.pageYOffset;
    header.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Add glow effect to links on mouse move (optional)
document.querySelectorAll('.social-link, .mix-card').forEach(element => {
    element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

// Add click analytics tracking (optional - replace with your analytics)
function trackLink(event, category, label) {
    // Example: Send to Google Analytics or other service
    // gtag('event', 'link_click', {
    //     'event_category': category,
    //     'event_label': label
    // });
    console.log('Tracked:', category, label);
}

// Attach tracking to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.textContent.trim();
        trackLink(null, 'social_media', platform);
    });
});

// Attach tracking to music links
document.querySelectorAll('.mix-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        trackLink(null, 'music', title);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .social-link, .mix-card, .event-button, .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
    }

    @keyframes ripple-animation {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(1);
        }
    }

    /* Mouse glow effect */
    .social-link::after, .mix-card::after {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -50%);
    }

    .social-link:hover::after, .mix-card:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Page load animation
window.addEventListener('load', function() {
    document.body.style.animation = 'none';
    // Add any post-load effects
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.social-link, .mix-card, .event-button, .btn').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// Log page analytics
console.log('DJDinn Links Site Loaded');
console.log('Welcome to DJDinn\'s link collection!');
