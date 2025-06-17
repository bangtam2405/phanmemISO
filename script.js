// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const backToTop = document.getElementById('backToTop');
const loadingScreen = document.getElementById('loadingScreen');

// Hero Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Thêm vào phần Hero Slider Functions
function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    const currentSlideElement = slides[index];
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
        
        // Áp dụng background từ data-bg attribute
        const bgValue = currentSlideElement.getAttribute('data-bg');
        if (bgValue) {
            currentSlideElement.style.background = bgValue;
        }
    }
    
    dots[index]?.classList.add('active');
    currentSlide = index;
}

// Cập nhật hàm initSlider
function initSlider() {
    if (!slides.length) return;
    
    // Áp dụng background cho tất cả slides từ data-bg
    slides.forEach(slide => {
        const bgValue = slide.getAttribute('data-bg');
        if (bgValue) {
            slide.style.background = bgValue;
        }
    });
    
    // Show first slide
    showSlide(0);
    
    // Auto slide
    setInterval(nextSlide, slideInterval);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Button navigation
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
}

let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
    
    // Initialize slider
    initSlider();
    
    // Initialize animations
    initAnimations();
    
    // Initialize counters
    initCounters();
    
    // Initialize form handling
    initForms();
});

// Mobile Menu Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header?.classList.add('scrolled');
        backToTop?.classList.add('visible');
    } else {
        header?.classList.remove('scrolled');
        backToTop?.classList.remove('visible');
    }
});

// Back to Top
backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero Slider Functions
function initSlider() {
    if (!slides.length) return;
    
    // Show first slide
    showSlide(0);
    
    // Auto slide
    setInterval(nextSlide, slideInterval);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Button navigation
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index]?.classList.add('active');
    dots[index]?.classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// Animations on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature-card, .award-card, .legal-item, .benefit-item, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// Form Handling
function initForms() {
    const contactForm = document.querySelector('.contact-form form');
    
    contactForm?.addEventListener('submit', handleFormSubmit);
    
    // Input validation
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearError);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(e.target)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Yêu cầu của bạn đã được gửi thành công!', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateInput({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    const type = input.type;
    
    // Remove existing error
    clearError(e);
    
    // Check if required field is empty
    if (input.hasAttribute('required') && !value) {
        showInputError(input, 'Trường này là bắt buộc');
        return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, 'Email không hợp lệ');
            return false;
        }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(value)) {
            showInputError(input, 'Số điện thoại không hợp lệ');
            return false;
        }
    }
    
    return true;
}

function showInputError(input, message) {
    input.style.borderColor = '#f44336';
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorDiv);
}

function clearError(e) {
    const input = e.target;
    input.style.borderColor = '#e0e0e0';
    
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px'
    });
    
    notification.querySelector('.notification-content').style.display = 'flex';
    notification.querySelector('.notification-content').style.alignItems = 'center';
    notification.querySelector('.notification-content').style.gap = '10px';
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginLeft = 'auto';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#FF9800',
        info: '#2196F3'
    };
    return colors[type] || colors.info;
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        if (navMenu?.classList.contains('active')) {
            hamburger?.click();
        }
    }
    
    // Arrow keys for slider navigation
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch/Swipe Support for Mobile Slider
let touchStartX = 0;
let touchEndX = 0;

const heroSlider = document.querySelector('.hero-slider');

heroSlider?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

heroSlider?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide(); // Swipe left - next slide
        } else {
            prevSlide(); // Swipe right - previous slide
        }
    }
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    if (window.scrollY > 100) {
        header?.classList.add('scrolled');
        backToTop?.classList.add('visible');
    } else {
        header?.classList.remove('scrolled');
        backToTop?.classList.remove('visible');
    }
}, 10);

// Replace the original scroll event listener
window.removeEventListener('scroll', () => {});
window.addEventListener('scroll', debouncedScrollHandler);

// Preload Critical Resources
function preloadResources() {
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You could send this to an error tracking service
});

// Analytics and Tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Track Event:', eventName, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a');
    if (target) {
        const trackingData = {
            element_type: target.tagName.toLowerCase(),
            element_text: target.textContent.trim(),
            element_class: target.className,
            page_url: window.location.href
        };
        
        if (target.classList.contains('btn-primary')) {
            trackEvent('cta_click', trackingData);
        } else if (target.classList.contains('nav-link')) {
            trackEvent('navigation_click', trackingData);
        }
    }
});

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.matches('form')) {
        trackEvent('form_submit', {
            form_id: e.target.id || 'unknown',
            page_url: window.location.href
        });
    }
});

// Page Visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations, videos, etc.
        document.querySelectorAll('video').forEach(video => {
            if (!video.paused) {
                video.pause();
                video.dataset.wasPlaying = 'true';
            }
        });
    } else {
        // Page is visible - resume animations, videos, etc.
        document.querySelectorAll('video[data-was-playing="true"]').forEach(video => {
            video.play();
            delete video.dataset.wasPlaying;
        });
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Utility Functions
const utils = {
    // Format number with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Validate email
    isValidEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Validate phone
    isValidPhone: (phone) => {
        return /^[0-9+\-\s()]{10,}$/.test(phone);
    },
    
    // Get device type
    getDeviceType: () => {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};

// Export utils for global use
window.utils = utils;

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    console.log('CUSC-ISO Website Initialized');
    trackEvent('page_load', {
        page_url: window.location.href,
        device_type: utils.getDeviceType(),
        timestamp: new Date().toISOString()
    });
}

// Thêm vào cuối file script.js

// Deployment Map Interactions
function initDeploymentMap() {
    const provinceMarkers = document.querySelectorAll('.province-marker');
    const deploymentStats = document.querySelectorAll('.deployment-stats .stat-number');
    
    // Animate province markers on scroll
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const markers = entry.target.querySelectorAll('.province-marker');
                markers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.style.opacity = '0';
                        marker.style.transform = 'scale(0)';
                        marker.style.transition = 'all 0.5s ease';
                        
                        setTimeout(() => {
                            marker.style.opacity = '1';
                            marker.style.transform = 'scale(1)';
                        }, 100);
                    }, index * 200);
                });
                
                // Animate deployment stats
                animateDeploymentStats();
                mapObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const mapContainer = document.querySelector('.vietnam-map');
    if (mapContainer) {
        mapObserver.observe(mapContainer);
    }
    
    // Add click interactions to province markers
    provinceMarkers.forEach(marker => {
        marker.addEventListener('click', () => {
            const provinceName = marker.getAttribute('data-province');
            showProvinceInfo(provinceName);
        });
        
        // Add hover effects
        marker.addEventListener('mouseenter', () => {
            marker.style.zIndex = '10';
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.style.zIndex = '2';
        });
    });
}

function animateDeploymentStats() {
    const statNumbers = document.querySelectorAll('.deployment-stats .stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const hasPlus = finalValue.includes('+');
        
        let currentValue = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            stat.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '');
        }, stepTime);
    });
}

// Cập nhật dữ liệu tỉnh thành thực tế
// Cập nhật dữ liệu tỉnh thành thực tế
function showProvinceInfo(provinceName) {
    const provinceData = {
        'Cà Mau': {
            units: 130,
            users: 650,
            deploymentDate: '2020',
            status: 'Hoàn thành',
            description: 'Triển khai tại UBND các cấp và sở ban ngành'
        },
        'Sóc Trăng': {
            units: 42,
            users: 210,
            deploymentDate: '2021',
            status: 'Hoàn thành',
            description: 'Tập trung vào các cơ quan hành chính nhà nước'
        },
        'Trà Vinh': {
            units: 133,
            users: 665,
            deploymentDate: '2021',
            status: 'Hoàn thành',
            description: 'Triển khai toàn diện tại các đơn vị công lập'
        },
        'Đắk Nông': {
            units: 77,
            users: 385,
            deploymentDate: '2022',
            status: 'Hoàn thành',
            description: 'Ưu tiên các sở ban ngành và UBND cấp huyện'
        },
        'Quảng Ninh': {
            units: 227,
            users: 1135,
            deploymentDate: '2019',
            status: 'Hoàn thành',
            description: 'Tỉnh đầu tiên triển khai quy mô lớn'
        },
        'Quảng Bình': {
            units: 208,
            users: 1040,
            deploymentDate: '2020',
            status: 'Hoàn thành',
            description: 'Triển khai đồng bộ từ tỉnh đến xã'
        },
        'Ninh Bình': {
            units: 40,
            users: 200,
            deploymentDate: '2022',
            status: 'Hoàn thành',
            description: 'Tập trung vào các cơ quan cấp tỉnh'
        }
    };
    
    const data = provinceData[provinceName] || {
        units: 0,
        users: 0,
        deploymentDate: 'N/A',
        status: 'Chưa triển khai',
        description: 'Chưa có thông tin'
    };
    
    const modalContent = `
        <div class="province-modal">
            <div class="province-modal-content">
                <div class="province-modal-header">
                    <h3><i class="fas fa-map-marker-alt"></i> ${provinceName}</h3>
                    <button class="province-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="province-modal-body">
                    <div class="province-description">
                        <p>${data.description}</p>
                    </div>
                    <div class="province-stats">
                        <div class="province-stat">
                            <i class="fas fa-building"></i>
                            <div>
                                <strong>${data.units}</strong>
                                <span>Đơn vị triển khai</span>
                            </div>
                        </div>
                        <div class="province-stat">
                            <i class="fas fa-users"></i>
                            <div>
                                <strong>${data.users}</strong>
                                <span>Người dùng ước tính</span>
                            </div>
                        </div>
                        <div class="province-stat">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <strong>${data.deploymentDate}</strong>
                                <span>Năm triển khai</span>
                            </div>
                        </div>
                        <div class="province-stat">
                            <i class="fas fa-check-circle"></i>
                            <div>
                                <strong>${data.status}</strong>
                                <span>Trạng thái</span>
                            </div>
                        </div>
                    </div>
                    <div class="province-breakdown">
                        <h4>Phân bổ theo đối tượng</h4>
                        <div class="breakdown-items">
                            <div class="breakdown-item">
                                <i class="fas fa-landmark"></i>
                                <span>UBND các cấp: ${Math.floor(data.units * 0.3)} đơn vị</span>
                            </div>
                            <div class="breakdown-item">
                                <i class="fas fa-building-columns"></i>
                                <span>Sở, ban, ngành: ${Math.floor(data.units * 0.5)} đơn vị</span>
                            </div>
                            <div class="breakdown-item">
                                <i class="fas fa-university"></i>
                                <span>Cơ quan sự nghiệp: ${Math.floor(data.units * 0.2)} đơn vị</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'province-modal-overlay';
    modal.innerHTML = modalContent;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContentEl = modal.querySelector('.province-modal-content');
    modalContentEl.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const modalHeader = modal.querySelector('.province-modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #f0f0f0;
    `;
    
    const modalHeaderH3 = modal.querySelector('.province-modal-header h3');
    modalHeaderH3.style.cssText = `
        color: #0D47A1;
        font-size: 1.5rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    const closeBtn = modal.querySelector('.province-modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const description = modal.querySelector('.province-description');
    description.style.cssText = `
        background: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 20px;
        border-left: 4px solid #0D47A1;
    `;
    
    const descriptionP = modal.querySelector('.province-description p');
    descriptionP.style.cssText = `
        margin: 0;
        color: #333;
        line-height: 1.6;
    `;
    
    const provinceStats = modal.querySelector('.province-stats');
    provinceStats.style.cssText = `
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 25px;
    `;
    
    const statItems = modal.querySelectorAll('.province-stat');
    statItems.forEach(item => {
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            transition: all 0.3s ease;
        `;
        
        const icon = item.querySelector('i');
        icon.style.cssText = `
            font-size: 1.5rem;
            color: #0D47A1;
            width: 30px;
        `;
        
        const textDiv = item.querySelector('div');
        textDiv.style.cssText = `
            display: flex;
            flex-direction: column;
        `;
        
        const strong = item.querySelector('strong');
        strong.style.cssText = `
            font-size: 1.2rem;
            color: #0D47A1;
            margin-bottom: 3px;
        `;
        
        const span = item.querySelector('span');
        span.style.cssText = `
            font-size: 0.9rem;
            color: #666;
        `;
    });
    
    const breakdown = modal.querySelector('.province-breakdown');
    breakdown.style.cssText = `
        background: linear-gradient(135deg, #e3f2fd, #f8f9fa);
        padding: 20px;
        border-radius: 15px;
    `;
    
    const breakdownH4 = modal.querySelector('.province-breakdown h4');
    breakdownH4.style.cssText = `
        color: #0D47A1;
        margin-bottom: 15px;
        font-size: 1.1rem;
    `;
    
    const breakdownItems = modal.querySelector('.breakdown-items');
    breakdownItems.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    
    const breakdownItemsList = modal.querySelectorAll('.breakdown-item');
    breakdownItemsList.forEach(item => {
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            background: white;
            border-radius: 8px;
        `;
        
        const icon = item.querySelector('i');
        icon.style.cssText = `
            color: #0D47A1;
            font-size: 1rem;
            width: 20px;
        `;
        
        const span = item.querySelector('span');
        span.style.cssText = `
            color: #333;
            font-size: 0.9rem;
        `;
    });
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContentEl.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContentEl.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Hover effect for close button
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = '#f0f0f0';
        closeBtn.style.color = '#0D47A1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
        closeBtn.style.color = '#666';
    });
    
    // Hover effects for stat items
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.background = '#e3f2fd';
            item.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = '#f8f9fa';
            item.style.transform = 'translateY(0)';
        });
    });
    
    // Close on ESC key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Cập nhật hàm animateDeploymentStats với số liệu thực tế
function animateDeploymentStats() {
    const statNumbers = document.querySelectorAll('.deployment-stats .stat-number');
    const realValues = [8, 857, 5000]; // Tỉnh/thành, Đơn vị, Người dùng
    
    statNumbers.forEach((stat, index) => {
        const finalValue = realValues[index];
        const hasPlus = stat.textContent.includes('+');
        
        let currentValue = 0;
        const increment = finalValue / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            stat.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '');
        }, stepTime);
    });
}

// Thêm click event cho province items trong danh sách
function initProvinceListClicks() {
    const provinceItems = document.querySelectorAll('.province-item[data-province]');
    
    provinceItems.forEach(item => {
        item.addEventListener('click', () => {
            const provinceName = item.getAttribute('data-province');
            showProvinceInfo(provinceName);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.background = '#e3f2fd';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'white';
        });
    });
}

// Cập nhật hàm initDeploymentMap
// Cập nhật hàm initDeploymentMap
function initDeploymentMap() {
    const provinceMarkers = document.querySelectorAll('.province-marker');
    
    // Animate province markers on scroll
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const markers = entry.target.querySelectorAll('.province-marker');
                markers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.style.opacity = '0';
                        marker.style.transform = 'scale(0)';
                        marker.style.transition = 'all 0.5s ease';
                        
                        setTimeout(() => {
                            marker.style.opacity = '1';
                            marker.style.transform = 'scale(1)';
                        }, 100);
                    }, index * 200);
                });
                
                // Animate deployment stats
                animateDeploymentStats();
                mapObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const mapContainer = document.querySelector('.vietnam-map');
    if (mapContainer) {
        mapObserver.observe(mapContainer);
    }
    
    // Add click interactions to province markers
    provinceMarkers.forEach(marker => {
        marker.addEventListener('click', () => {
            const provinceName = marker.getAttribute('data-province');
            showProvinceInfo(provinceName);
            
            // Track event
            trackEvent('province_marker_click', {
                province: provinceName,
                units: marker.getAttribute('data-units')
            });
        });
        
        // Add hover effects
        marker.addEventListener('mouseenter', () => {
            marker.style.zIndex = '10';
            marker.style.transform = 'scale(1.2)';
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.style.zIndex = '2';
            marker.style.transform = 'scale(1)';
        });
    });
    
    // Initialize province list clicks
    initProvinceListClicks();
}

// Thêm hàm tạo hiệu ứng ripple khi click
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(13, 71, 161, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Thêm CSS animation cho ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Thêm ripple effect cho các province items
function initProvinceListClicks() {
    const provinceItems = document.querySelectorAll('.province-item[data-province]');
    
    provinceItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const provinceName = item.getAttribute('data-province');
            createRippleEffect(item, e);
            
            setTimeout(() => {
                showProvinceInfo(provinceName);
            }, 150);
            
            // Track event
            trackEvent('province_list_click', {
                province: provinceName
            });
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.background = '#e3f2fd';
            item.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'white';
            item.style.transform = 'translateX(0)';
        });
    });
}

// Thêm hàm tạo tooltip động cho markers
function createDynamicTooltip(marker) {
    const provinceName = marker.getAttribute('data-province');
    const units = marker.getAttribute('data-units');
    
    const tooltip = document.createElement('div');
    tooltip.className = 'dynamic-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <strong>${provinceName}</strong>
            <span>${units} đơn vị</span>
            <small>Click để xem chi tiết</small>
        </div>
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(13, 71, 161, 0.95);
        color: white;
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 0.85rem;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        margin-bottom: 8px;
    `;
    
    const tooltipContent = tooltip.querySelector('.tooltip-content');
    tooltipContent.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    `;
    
    const strong = tooltip.querySelector('strong');
    strong.style.cssText = `
        font-size: 0.9rem;
        margin-bottom: 2px;
    `;
    
    const span = tooltip.querySelector('span');
    span.style.cssText = `
        font-size: 0.8rem;
        opacity: 0.9;
    `;
    
    const small = tooltip.querySelector('small');
    small.style.cssText = `
        font-size: 0.7rem;
        opacity: 0.7;
        margin-top: 2px;
    `;
    
    // Add arrow
    const arrow = document.createElement('div');
    arrow.style.cssText = `
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid rgba(13, 71, 161, 0.95);
    `;
    tooltip.appendChild(arrow);
    
    return tooltip;
}

// Cập nhật lại phần marker interactions với tooltip động
function initDeploymentMap() {
    const provinceMarkers = document.querySelectorAll('.province-marker');
    
    // Animate province markers on scroll
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const markers = entry.target.querySelectorAll('.province-marker');
                markers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.style.opacity = '0';
                        marker.style.transform = 'scale(0)';
                        marker.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                        
                        setTimeout(() => {
                            marker.style.opacity = '1';
                            marker.style.transform = 'scale(1)';
                        }, 100);
                    }, index * 150);
                });
                
                // Animate deployment stats
                setTimeout(() => {
                    animateDeploymentStats();
                }, markers.length * 150 + 500);
                
                mapObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const mapContainer = document.querySelector('.vietnam-map');
    if (mapContainer) {
        mapObserver.observe(mapContainer);
    }
    
    // Add interactions to province markers
    provinceMarkers.forEach(marker => {
        const tooltip = createDynamicTooltip(marker);
        marker.appendChild(tooltip);
        
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            const provinceName = marker.getAttribute('data-province');
            
            // Add click animation
            marker.style.transform = 'scale(0.9)';
            setTimeout(() => {
                marker.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    marker.style.transform = 'scale(1)';
                }, 150);
            }, 100);
            
            setTimeout(() => {
                showProvinceInfo(provinceName);
            }, 250);
            
            // Track event
            trackEvent('province_marker_click', {
                province: provinceName,
                units: marker.getAttribute('data-units')
            });
        });
        
        // Hover effects with tooltip
        marker.addEventListener('mouseenter', () => {
            marker.style.zIndex = '10';
            marker.style.transform = 'scale(1.2)';
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.style.zIndex = '2';
            marker.style.transform = 'scale(1)';
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
        });
    });
    
    // Initialize province list clicks
    initProvinceListClicks();
}

// Thêm hàm tạo số liệu thống kê động
function createLiveStats() {
    const statsContainer = document.querySelector('.deployment-stats');
    if (!statsContainer) return;
    
    // Tạo hiệu ứng counter up khi hover
    const statCards = statsContainer.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        const statNumber = card.querySelector('.stat-number');
        const originalValue = statNumber.textContent;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 15px 40px rgba(13, 71, 161, 0.2)';
            
            // Animate number slightly
            const currentValue = parseInt(originalValue.replace(/\D/g, ''));
            const increment = Math.floor(currentValue * 0.1);
            const tempValue = currentValue + increment;
            
            statNumber.style.transform = 'scale(1.1)';
            statNumber.style.color = '#FF6B35';
            
            setTimeout(() => {
                statNumber.textContent = tempValue + (originalValue.includes('+') ? '+' : '');
            }, 100);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(13, 71, 161, 0.1)';
            
            statNumber.style.transform = 'scale(1)';
            statNumber.style.color = '#0D47A1';
            statNumber.textContent = originalValue;
        });
    });
}

// Cập nhật hàm init chính
function init() {
    console.log('CUSC-ISO Website Initialized');
    
    // Initialize deployment map
    initDeploymentMap();
    
    // Initialize live stats
    createLiveStats();
    
    trackEvent('page_load', {
        page_url: window.location.href,
        device_type: utils.getDeviceType(),
        timestamp: new Date().toISOString()
    });
}

// Thêm event listener cho responsive behavior
window.addEventListener('resize', debounce(() => {
    const markers = document.querySelectorAll('.province-marker');
    const isMobile = window.innerWidth < 768;
    
    markers.forEach(marker => {
        const label = marker.querySelector('.marker-label');
        if (label) {
            if (isMobile) {
                label.style.fontSize = '0.7rem';
                label.style.padding = '3px 6px';
            } else {
                label.style.fontSize = '0.8rem';
                label.style.padding = '5px 10px';
            }
        }
    });
}, 250));

