// --- Data ---
const SERVICES = [
    {
        id: 'auto',
        title: 'Assurance Auto',
        description: 'Une protection complète pour vous et votre véhicule, avec assistance 24/7.',
        icon: 'car'
    },
    {
        id: 'habitation',
        title: 'Assurance Habitation',
        description: 'Protégez votre foyer et vos biens contre les imprévus (incendie, vol, dégâts des eaux).',
        icon: 'home'
    },
    {
        id: 'sante',
        title: 'Assurance Santé',
        description: 'Des remboursements rapides et une couverture adaptée à vos besoins médicaux.',
        icon: 'heart-pulse'
    },
    {
        id: 'prevoyance',
        title: 'Prévoyance',
        description: 'Assurez l\'avenir de vos proches et maintenez votre niveau de vie.',
        icon: 'shield-check'
    },
    {
        id: 'pro',
        title: 'Assurance Pro',
        description: 'Des solutions sur mesure pour les entreprises et les professionnels indépendants.',
        icon: 'briefcase'
    }
];

const TIMELINE = [
    {
        year: "1817",
        title: "Les Origines",
        description: "Création de la Mutuelle de L'Assurance contre L'Incendie (Ancienne Mutuelle de Rouen), point de départ de l'aventure AXA."
    },
    {
        year: "1985",
        title: "Naissance d'AXA",
        description: "Le groupe adopte officiellement le nom AXA, une marque courte et dynamique conçue pour une expansion internationale."
    },
    {
        year: "1996",
        title: "L'Expansion Majeure",
        description: "Acquisition de l'UAP, doublant la taille du groupe et le propulsant au rang de leader mondial de l'assurance."
    },
    {
        year: "2000",
        title: "Expertise Financière",
        description: "Acquisition de Sanford C. Bernstein, renforçant les capacités du groupe en gestion d'actifs (AllianceBernstein)."
    },
    {
        year: "2016",
        title: "Transformation Digitale",
        description: "Lancement du plan stratégique Ambition 2020, axé sur l'innovation, la santé et la protection des clients."
    }
];

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?auto=format&fit=crop&q=80&w=1920"
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initHeroSlider();
    renderServices();
    renderTimeline();
    initNavbar();
    initPopup();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// --- View Management ---
function showView(viewName) {
    const homeView = document.getElementById('home-view');
    const historyView = document.getElementById('history-view');
    const navbar = document.getElementById('navbar');
    const navTitle = document.getElementById('nav-title');
    const navSubtitle = document.getElementById('nav-subtitle');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    if (viewName === 'home') {
        homeView.classList.remove('hidden');
        historyView.classList.add('hidden');
        window.scrollTo(0, 0);
        updateNavbarStyle(window.scrollY > 20);
    } else {
        homeView.classList.add('hidden');
        historyView.classList.remove('hidden');
        window.scrollTo(0, 0);
        
        // Always white navbar on history view
        navbar.classList.add('bg-white', 'shadow-md', 'py-3');
        navbar.classList.remove('bg-transparent', 'py-6');
        navTitle.classList.add('text-[#00008F]');
        navTitle.classList.remove('text-white');
        navSubtitle.classList.add('text-gray-500');
        navSubtitle.classList.remove('text-blue-100/80');
        mobileMenuBtn.classList.add('text-gray-900');
        mobileMenuBtn.classList.remove('text-white');
        navLinks.forEach(link => {
            link.classList.add('text-gray-700');
            link.classList.remove('text-white');
        });
    }
}

// --- Navbar ---
function initNavbar() {
    window.addEventListener('scroll', () => {
        const historyView = document.getElementById('history-view');
        if (historyView.classList.contains('hidden')) {
            updateNavbarStyle(window.scrollY > 20);
        }
    });
}

function updateNavbarStyle(scrolled) {
    const navbar = document.getElementById('navbar');
    const navTitle = document.getElementById('nav-title');
    const navSubtitle = document.getElementById('nav-subtitle');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    if (scrolled) {
        navbar.classList.add('bg-white', 'shadow-md', 'py-3');
        navbar.classList.remove('bg-transparent', 'py-6');
        navTitle.classList.add('text-[#00008F]');
        navTitle.classList.remove('text-white');
        navSubtitle.classList.add('text-gray-500');
        navSubtitle.classList.remove('text-blue-100/80');
        mobileMenuBtn.classList.add('text-gray-900');
        mobileMenuBtn.classList.remove('text-white');
        navLinks.forEach(link => {
            link.classList.add('text-gray-700');
            link.classList.remove('text-white');
        });
    } else {
        navbar.classList.remove('bg-white', 'shadow-md', 'py-3');
        navbar.classList.add('bg-transparent', 'py-6');
        navTitle.classList.remove('text-[#00008F]');
        navTitle.classList.add('text-white');
        navSubtitle.classList.remove('text-gray-500');
        navSubtitle.classList.add('text-blue-100/80');
        mobileMenuBtn.classList.remove('text-gray-900');
        mobileMenuBtn.classList.add('text-white');
        navLinks.forEach(link => {
            link.classList.remove('text-gray-700');
            link.classList.add('text-white');
        });
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- Hero Slider ---
function initHeroSlider() {
    const container = document.getElementById('hero-slider');
    HERO_IMAGES.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r from-[#00008F]/90 via-[#00008F]/70 to-transparent z-10"></div>
            <img src="${src}" alt="Background" class="w-full h-full object-cover" referrerpolicy="no-referrer">
        `;
        container.appendChild(slide);
    });

    let currentSlide = 0;
    setInterval(() => {
        const slides = document.querySelectorAll('.hero-slide');
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// --- Services ---
function renderServices() {
    const grid = document.getElementById('services-grid');
    SERVICES.forEach((service, index) => {
        const isLarge = index === 0 || index === 1;
        const card = document.createElement('div');
        card.className = `bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all border border-white/10 group cursor-pointer flex flex-col justify-between ${
            isLarge ? 'md:col-span-2 lg:col-span-3 min-h-[320px]' : 'md:col-span-2 lg:col-span-2 min-h-[280px]'
        }`;
        card.innerHTML = `
            <div>
                <div class="w-14 h-14 bg-blue-50 text-[#00008F] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00008F] group-hover:text-white transition-all duration-500">
                    <i data-lucide="${service.icon}" class="w-8 h-8"></i>
                </div>
                <h3 class="text-2xl font-bold text-[#00008F] mb-3 tracking-tight">${service.title}</h3>
                <p class="text-gray-500 leading-relaxed mb-6 text-sm md:text-base">${service.description}</p>
            </div>
            <div class="flex items-center text-[#00008F] font-bold text-sm group-hover:gap-2 transition-all">
                En savoir plus <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </div>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}

// --- Timeline ---
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    TIMELINE.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = `flex flex-col lg:flex-row items-center ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`;
        div.innerHTML = `
            <div class="w-full lg:w-1/2 px-4 lg:px-12">
                <div class="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-500 ${i % 2 === 0 ? 'text-left' : 'lg:text-right'}">
                    <span class="text-[#FF0000] font-black text-5xl mb-4 block opacity-20 group-hover:opacity-100 transition-opacity duration-500">${item.year}</span>
                    <h4 class="text-2xl font-bold text-[#00008F] mb-4">${item.title}</h4>
                    <p class="text-gray-600 leading-relaxed text-base">${item.description}</p>
                </div>
            </div>
            <div class="w-14 h-14 bg-[#00008F] rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center my-4 lg:my-0 group">
                <i data-lucide="zap" class="w-6 h-6 text-white group-hover:scale-125 transition-transform"></i>
            </div>
            <div class="hidden lg:block lg:w-1/2"></div>
        `;
        container.appendChild(div);
    });
    lucide.createIcons();
}

// --- Popup ---
function initPopup() {
    setTimeout(() => {
        const popup = document.getElementById('cta-popup');
        popup.classList.remove('hidden');
        popup.classList.add('flex');
    }, 5000);
}

function closePopup() {
    const popup = document.getElementById('cta-popup');
    popup.classList.add('hidden');
    popup.classList.remove('flex');
}
