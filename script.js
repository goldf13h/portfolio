// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Height of fixed navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Typing Animation
class TypingAnimation {
    constructor(element, speed = 100) {
        this.element = element;
        this.speed = speed;
        this.text = '';
        this.isTyping = false;
        this.currentIndex = 0;
    }

    startTyping(text) {
        if (this.isTyping) {
            this.stop();
            this.element.innerHTML = '';
        }
        
        this.text = text;
        this.currentIndex = 0;
        this.isTyping = true;
        this.type();
    }

    type() {
        if (!this.isTyping || this.currentIndex >= this.text.length) {
            this.isTyping = false;
            return;
        }

        if (this.text[this.currentIndex] === '<') {
            const closingIndex = this.text.indexOf('>', this.currentIndex);
            if (closingIndex !== -1) {
                this.element.innerHTML += this.text.substring(this.currentIndex, closingIndex + 1);
                this.currentIndex = closingIndex + 1;
            }
        } else {
            this.element.innerHTML += this.text[this.currentIndex];
            this.currentIndex++;
        }

        setTimeout(() => this.type(), this.speed);
    }

    stop() {
        this.isTyping = false;
    }
}

// Initialize typing animation
const typingText = document.querySelector('.typing-text');
const typingAnimation = new TypingAnimation(typingText);

// Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('typing-text') && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');
                typingAnimation.startTyping(translations[currentLanguage]['greeting']);
            }
        }
    });
}, observerOptions);

// Observe all sections and the typing text
document.querySelectorAll('section, .typing-text').forEach(section => {
    observer.observe(section);
});

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(progress => {
        const width = progress.style.width;
        progress.style.width = '0';
        setTimeout(() => {
            progress.style.width = width;
        }, 100);
    });
}

// Trigger progress bar animation when skills section is in view
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
        }
    });
}, observerOptions);

skillsObserver.observe(skillsSection);

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        // Here you would typically send the form data to a server
        // For now, we'll simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Floating Labels
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.classList.add('active');
    });

    field.addEventListener('blur', () => {
        if (field.value === '') {
            field.classList.remove('active');
        }
    });
});

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.classList.add('scroll-top');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add scroll-top button styles
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 1000;
    }

    .scroll-top.show {
        opacity: 1;
        visibility: visible;
    }

    .scroll-top:hover {
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);

// Language Translations
const translations = {
    en: {
        'portfolio': 'Portfolio',
        'home': 'Home',
        'about': 'About',
        'skills': 'Skills',
        'projects': 'Projects',
        'contact': 'Contact',
        'greeting': 'Hi, I\'m <span class="highlight">Yanlin Rein Yu</span>',
        'role': 'Full Stack Developer',
        'view-work': 'View My Work',
        'contact-me': 'Contact Me',
        'about-title': 'About Me',
        'about-description': 'I\'m currently a graduate student at University of Tsukuba, with a deep passion for programming and technology. I love turning ideas into reality through code, constantly learning and exploring new technologies. With a multicultural background, I can communicate fluently in English, Japanese, and Chinese, which allows me to collaborate effectively in diverse environments.',
        'languages-title': 'Languages',
        'lang-fluent': 'Business Level',
        'lang-native': 'Native',
        'student-status': 'Student',
        'learner-status': 'Learner',
        'languages-spoken': 'Languages',
        'skills-title': 'My Skills',
        'projects-title': 'My Projects',
        'project-one-title': 'Project One',
        'project-one-description': 'A beautiful web application built with modern technologies.',
        'live-demo': 'Live Demo',
        'source-code': 'Source Code',
        'contact-title': 'Get In Touch',
        'location': 'Tsukuba, Ibaraki, Japan',
        'name': 'Name',
        'message': 'Message',
        'send-message': 'Send Message',
        'copyright': '© 2024 Yanlin Rachel Yu. All rights reserved.'
    },
    jp: {
        'portfolio': 'ポートフォリオ',
        'home': 'ホーム',
        'about': '私について',
        'skills': 'スキル',
        'projects': 'プロジェクト',
        'contact': 'お問い合わせ',
        'greeting': 'こんにちは、<span class="highlight">Yanlin Rein Yu</span>です',
        'role': 'フルスタック開発者',
        'view-work': '作品を見る',
        'contact-me': 'お問い合わせ',
        'about-title': '私について',
        'about-description': '私は現在、筑波大学の大学院生として、プログラミングとテクノロジーに深い情熱を持って取り組んでいます。新しい技術を常に学び、探求しながら、アイデアをコードで実現することを楽しんでいます。多文化的な背景を持ち、英語、日本語、中国語を流暢に話せることで、多様な環境での効果的なコラボレーションが可能です。',
        'languages-title': '言語',
        'lang-fluent': 'ビジネスレベル',
        'lang-native': 'ネイティブ',
        'student-status': '大学院生',
        'learner-status': '学習者',
        'languages-spoken': 'カ国語',
        'skills-title': 'スキル',
        'projects-title': 'プロジェクト',
        'project-one-title': 'プロジェクト1',
        'project-one-description': '最新技術で構築された美しいウェブアプリケーション',
        'live-demo': 'デモを見る',
        'source-code': 'ソースコード',
        'contact-title': 'お問い合わせ',
        'location': '茨城県つくば市',
        'name': 'お名前',
        'message': 'メッセージ',
        'send-message': '送信',
        'copyright': '© 2024 Yanlin Rachel Yu. All rights reserved.'
    }
};

// Language Switcher
const langToggle = document.querySelector('.lang-toggle');
const currentLang = document.querySelector('.current-lang');
let currentLanguage = localStorage.getItem('language') || 'en';

function updateLanguage(lang) {
    currentLanguage = lang;
    currentLang.textContent = lang.toUpperCase();
    localStorage.setItem('language', lang);
    
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            if (element === typingText && !element.classList.contains('typed')) {
                typingAnimation.startTyping(translations[lang][key]);
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
}

langToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'en' ? 'jp' : 'en';
    updateLanguage(newLang);
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLanguage);
}); 