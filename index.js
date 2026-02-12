if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.createElement('a');
    backToTopBtn.href = "#";
    backToTopBtn.className = "back-to-top";
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to Top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (window.matchMedia("(min-width: 769px)").matches) {
        const cards = document.querySelectorAll('.service-card, .highlight-item, .home-info-banner');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    const typeWriterElement = document.querySelector('.typewriter-text');
    if (typeWriterElement) {
        const texts = JSON.parse(typeWriterElement.getAttribute('data-text'));
        let count = 0;
        let index = 0;
        let currentText = '';
        let letter = '';

        (function type() {
            if (count === texts.length) {
                count = 0;
            }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);

            typeWriterElement.textContent = letter;
            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        })();
    }

    window.scrollTo(0, 0);

    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }

    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const menu = document.querySelector('.nav-menu');
            menu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            const menu = document.querySelector('.nav-menu');
            menu.classList.remove('show-menu');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.nav-menu');
            menu.classList.remove('show-menu');
        });
    });

    document.addEventListener('click', (e) => {
        const menu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.nav-toggle');

        if (menu.classList.contains('show-menu') && !menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('show-menu');
        }
    });

    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const menu = document.querySelector('.nav-menu');
        if (menu.classList.contains('show-menu')) {
            menu.classList.remove('show-menu');
        }
    });

    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'fa-sun';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun';

    if (selectedTheme) {
        document.documentElement.setAttribute('data-theme', selectedTheme === 'dark' ? 'dark' : 'light');
        if (selectedTheme === 'dark') {
            themeButton.classList.remove('fa-moon');
            themeButton.classList.add('fa-sun');
        } else {
            themeButton.classList.add('fa-moon');
            themeButton.classList.remove('fa-sun');
        }
    }

    themeButton.addEventListener('click', () => {
        const currentThm = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';

        if (currentThm === 'light') {
            newTheme = 'dark';
            themeButton.classList.remove('fa-moon');
            themeButton.classList.add('fa-sun');
        } else {
            newTheme = 'light';
            themeButton.classList.remove('fa-sun');
            themeButton.classList.add('fa-moon');
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('selected-theme', newTheme);
        localStorage.setItem('selected-icon', getCurrentIcon());
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .about-img-box, .about-content, .home-info-banner, .article-text, .article-visual, .highlight-item, .section-header');

    animateElements.forEach((el, index) => {
        if (el.parentElement.classList.contains('services-grid') || el.parentElement.classList.contains('service-highlights')) {
            const delay = (index % 3) * 0.1;
            el.style.transitionDelay = `${delay}s`;
        }
        observer.observe(el);
    });

});
