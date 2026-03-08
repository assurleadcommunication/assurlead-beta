// Navbar Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ROI Calculator Logic
const budgetInput = document.getElementById('budget');
const cplInput = document.getElementById('cpl');
const convInput = document.getElementById('conv');

const budgetVal = document.getElementById('budget-val');
const cplVal = document.getElementById('cpl-val');
const convVal = document.getElementById('conv-val');

const resLeads = document.getElementById('res-leads');
const resSales = document.getElementById('res-sales');
const resRoi = document.getElementById('res-roi');

function updateCalculator() {
    const budget = parseInt(budgetInput.value);
    const cpl = parseInt(cplInput.value);
    const conv = parseInt(convInput.value);
    const avgCommission = 1200;

    budgetVal.innerText = budget.toLocaleString() + ' MAD';
    cplVal.innerText = cpl + ' MAD';
    convVal.innerText = conv + '%';

    const leads = Math.floor(budget / cpl);
    const sales = Math.floor(leads * (conv / 100));
    const revenue = sales * avgCommission;
    const roi = budget > 0 ? ((revenue - budget) / budget) * 100 : 0;

    resLeads.innerText = leads.toLocaleString();
    resSales.innerText = sales.toLocaleString();
    resRoi.innerText = '+' + roi.toFixed(0) + '%';

    // Update 3D intensity if needed
    if (window.updateBeamIntensity) {
        window.updateBeamIntensity(roi / 1000);
    }
}

[budgetInput, cplInput, convInput].forEach(input => {
    input.addEventListener('input', updateCalculator);
});

updateCalculator();

// Ticker Logic
const ticker = document.getElementById('ticker');
const tickerName = document.getElementById('ticker-name');
const tickerMeta = document.getElementById('ticker-meta');

const leads = [
    { name: "Ahmed B.", city: "Casablanca", time: "à l'instant" },
    { name: "Sara M.", city: "Rabat", time: "il y a 2 min" },
    { name: "Youssef K.", city: "Marrakech", time: "il y a 5 min" },
    { name: "Inès T.", city: "Tanger", time: "il y a 1 min" }
];

function showTicker() {
    const lead = leads[Math.floor(Math.random() * leads.length)];
    tickerName.innerText = lead.name + " vient de s'inscrire";
    tickerMeta.innerText = lead.city + " • " + lead.time;
    
    ticker.classList.add('active');
    setTimeout(() => {
        ticker.classList.remove('active');
    }, 5000);
}

setInterval(showTicker, 15000);
setTimeout(showTicker, 3000);

// --- Three.js 3D Beam Logic ---
function initThreeJS() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Beam
    const beamGeometry = new THREE.CylinderGeometry(0.5, 0.8, 10, 32, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
    });
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.y = 0;
    scene.add(beam);

    // Core Beam (brighter)
    const coreGeometry = new THREE.CylinderGeometry(0.1, 0.15, 10, 16, 1, true);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Particles
    const particleCount = 100;
    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < particleCount; i++) {
        const p = new THREE.Mesh(particleGeometry, particleMaterial);
        p.position.set(
            (Math.random() - 0.5) * 1.5,
            Math.random() * 10 - 5,
            (Math.random() - 0.5) * 1.5
        );
        p.userData.speed = 0.02 + Math.random() * 0.05;
        particles.add(p);
    }
    scene.add(particles);

    // Floating Symbols
    const symbols = ['DH', 'MAD', '$'];
    const symbolGroup = new THREE.Group();
    
    function createTextTexture(text) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 128;
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 64px Outfit';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 64, 64);
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    for (let i = 0; i < 12; i++) {
        const symbol = symbols[i % symbols.length];
        const texture = createTextTexture(symbol);
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 });
        const sprite = new THREE.Sprite(material);
        
        sprite.userData = {
            angle: Math.random() * Math.PI * 2,
            radius: 1.5 + Math.random() * 1.5,
            speed: 0.01 + Math.random() * 0.02,
            yOffset: Math.random() * 6 - 3,
            yAmplitude: 0.5 + Math.random() * 0.5,
            yFreq: 0.5 + Math.random() * 1
        };
        
        symbolGroup.add(sprite);
    }
    scene.add(symbolGroup);

    // Update intensity function
    window.updateBeamIntensity = (intensity) => {
        const scale = 0.5 + intensity * 2;
        beam.scale.x = scale;
        beam.scale.z = scale;
        beam.material.opacity = 0.2 + intensity * 0.5;
        core.material.opacity = 0.5 + intensity * 0.5;
    };

    function animate() {
        requestAnimationFrame(animate);

        // Rotate beam
        beam.rotation.y += 0.01;
        core.rotation.y -= 0.02;

        // Animate particles
        particles.children.forEach(p => {
            p.position.y += p.userData.speed;
            if (p.position.y > 5) p.position.y = -5;
        });

        // Animate symbols
        symbolGroup.children.forEach(s => {
            s.userData.angle += s.userData.speed;
            s.position.x = Math.cos(s.userData.angle) * s.userData.radius;
            s.position.z = Math.sin(s.userData.angle) * s.userData.radius;
            s.position.y = s.userData.yOffset + Math.sin(Date.now() * 0.001 * s.userData.yFreq) * s.userData.yAmplitude;
            
            // Scale based on distance to camera for depth effect
            const dist = s.position.distanceTo(camera.position);
            s.scale.setScalar(Math.max(0.3, 1.5 - dist / 10));
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Initialize Three.js after DOM is loaded
document.addEventListener('DOMContentLoaded', initThreeJS);
