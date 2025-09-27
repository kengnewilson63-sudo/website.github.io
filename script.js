// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
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

// Modal for Portfolio
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.querySelector('.close');

const projectDetails = {
    project1: {
        title: 'Villa Moderne',
        description: 'Construction d\'une villa moderne de 300m² avec piscine et jardin paysagé. Réalisée en 2023 avec des matériaux écologiques.',
        images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800'],
        features: ['Piscine chauffée', 'Panneaux solaires', 'Domotique', 'Jardin japonais']
    },
    project2: {
        title: 'Rénovation Commerciale',
        description: 'Rénovation complète d\'un immeuble commercial de 5 étages. Transformation en espaces de coworking modernes.',
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
        features: ['Open space', 'Salle de réunion', 'Espace détente', 'Toit terrasse']
    },
    project3: {
        title: 'Extension Bois',
        description: 'Extension en bois d\'une maison ancienne. Ajout de 80m² avec véranda et cuisine ouverte.',
        images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'],
        features: ['Structure bois', 'Véranda', 'Cuisine équipée', 'Chauffage au sol']
    }
};

function openModal(projectId) {
    const project = projectDetails[projectId];
    if (project) {
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <img src="${project.images[0]}" alt="${project.title}" style="width: 100%; border-radius: 10px; margin: 1rem 0;">
            <p>${project.description}</p>
            <h3>Caractéristiques :</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        modal.style.display = 'block';
    }
}

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact Form
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Merci pour votre message ! Nous vous contacterons bientôt.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Service Cards Animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const service = card.getAttribute('data-service');
        alert(`Plus d'informations sur ${service} bientôt disponibles !`);
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci de vous être abonné à notre newsletter !');
    newsletterForm.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .portfolio-item, .team-member').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Add stats section if needed
const statsSection = document.createElement('section');
statsSection.className = 'stats';
statsSection.innerHTML = `
    <div class="container">
        <div class="stats-grid">
            <div class="stat-item">
                <h3 data-target="150">0</h3>
                <p>Projets réalisés</p>
            </div>
            <div class="stat-item">
                <h3 data-target="50">0</h3>
                <p>Clients satisfaits</p>
            </div>
            <div class="stat-item">
                <h3 data-target="10">0</h3>
                <p>Années d'expérience</p>
            </div>
            <div class="stat-item">
                <h3 data-target="25">0</h3>
                <p>Professionnels</p>
            </div>
        </div>
    </div>
`;

// Insert after hero section
const heroSection = document.querySelector('.hero');
heroSection.parentNode.insertBefore(statsSection, heroSection.nextSibling);

// Animate stats when in view
const statItems = document.querySelectorAll('.stat-item h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statItems.forEach(item => statsObserver.observe(item));

// Add CSS for stats section
const statsCSS = `
.stats {
    padding: 4rem 2rem;
    background: var(--light-color);
}

.stats-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    text-align: center;
}

.stat-item h3 {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.stat-item p {
    font-size: 1.1rem;
    color: var(--text-color);
}
`;

// Add stats CSS to head
const styleSheet = document.createElement('style');
styleSheet.textContent = statsCSS;
document.head.appendChild(styleSheet);