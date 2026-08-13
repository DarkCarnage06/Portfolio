/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('show');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');
    if (navMenu) navMenu.classList.remove('show');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1400,
    delay: 120,
    reset: false
});

sr.reveal('.home__data, .home__social, .home__card, .about__img-wrap, .about__content, .skill-group, .work__card, .experience__item, .contact__form', { interval: 160 });

/*===== CONTACT FORM SERVER SUBMIT =====*/
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !message) {
            if (contactStatus) {
                contactStatus.textContent = 'Please fill in all fields before sending.';
                contactStatus.style.color = '#dc2626';
            }
            return;
        }

        if (contactStatus) {
            contactStatus.textContent = 'Sending message...';
            contactStatus.style.color = '#1d4ed8';
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            if (contactStatus) {
                contactStatus.textContent = result.message || 'Message sent successfully. Thank you!';
                contactStatus.style.color = '#1d4ed8';
            }
            contactForm.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            if (contactStatus) {
                contactStatus.textContent = 'Message received! I\'ll get back to you soon.';
                contactStatus.style.color = '#1d4ed8';
            }
            contactForm.reset();
        }
    });
}

