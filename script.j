/**
 * SCRIPT.JS - ASSURLEAD PROJECT
 * Vanilla JavaScript - No Frameworks
 * Features: Sticky Nav, Scroll Animations, Mobile Menu, Form Handling, Lead Ticker
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. STICKY NAVIGATION --- */
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };

    window.addEventListener('scroll', handleScroll);


    /* --- 2. MOBILE MENU TOGGLE --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        // Simple toggle for mobile view
        // In a real project, you might want a more elaborate overlay
        navMenu.classList.toggle('active-mobile');
        
        // Change icon
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active-mobile')) {
            icon.classList.replace('fa-bars', 'fa-times');
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'rgba(5,5,5,0.95)';
            navMenu.style.padding = '40px';
            navMenu.style.gap = '24px';
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            navMenu.style.display = '';
        }
    });


    /* --- 3. SCROLL REVEAL ANIMATIONS --- */
    // Using Intersection Observer for better performance
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* --- 4. LEAD TICKER LOGIC --- */
    const ticker = document.getElementById('lead-ticker');
    const tickerName = document.getElementById('ticker-name');
    const tickerCity = document.getElementById('ticker-city');

    const leads = [
        { name: "Ahmed B.", city: "Casablanca" },
        { name: "Sara M.", city: "Rabat" },
        { name: "Youssef K.", city: "Marrakech" },
        { name: "Inès T.", city: "Tanger" },
        { name: "Mehdi L.", city: "Agadir" }
    ];

    let leadIndex = 0;

    const showNextLead = () => {
        const lead = leads[leadIndex];
        tickerName.textContent = lead.name;
        tickerCity.textContent = lead.city;
        
        ticker.classList.add('active');
        
        // Hide after 5 seconds
        setTimeout(() => {
            ticker.classList.remove('active');
        }, 5000);

        leadIndex = (leadIndex + 1) % leads.length;
    };

    // Start ticker after 3 seconds, then every 15 seconds
    setTimeout(() => {
        showNextLead();
        setInterval(showNextLead, 15000);
    }, 3000);


    /* --- 5. FORM HANDLING --- */
    const leadForm = document.getElementById('lead-form');
    const formSuccess = document.getElementById('form-success');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', data);

            // Simulate API call
            const submitBtn = leadForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            setTimeout(() => {
                leadForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Reset form (optional)
                // leadForm.reset();
            }, 1500);
        });
    }


    /* --- 6. SMOOTH SCROLL FOR ANCHORS --- */
    // Already handled by CSS scroll-behavior: smooth, 
    // but this ensures it works for all links and handles offsets
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active-mobile')) {
                    mobileToggle.click();
                }

                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
