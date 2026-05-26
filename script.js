const vehicles = [
    {
        model: "2025 Toyota Camry SE",
        type: "Sport Sedan",
        price: "$29,995",
        desc: "Sleek midsize sedan with sharp styling, advanced safety features, and everyday comfort.",
        features: ["Low APR Available", "Fuel Efficient", "Apple CarPlay", "Backup Camera"],
        cta: "SCHEDULE TEST DRIVE",
        tag: "Great Daily Driver",
        shortType: "Sedan",
        image: "https://loremflickr.com/800/400/sedan,car?random=1" // Placeholder using free service
    },
    {
        model: "2024 Ford F-150 XLT",
        type: "Full-Size Pickup",
        price: "$43,850",
        desc: "Built for work, weekends, towing, hauling, and serious everyday capability.",
        features: ["Tow Package", "Crew Cab", "4x4 Available", "Work Ready"],
        cta: "VIEW TRUCK SPECIALS",
        tag: "Best Seller",
        shortType: "Truck",
        image: "https://loremflickr.com/800/400/truck,f150?random=2"
    },
    {
        model: "2025 Honda CR-V EX",
        type: "Compact SUV",
        price: "$34,200",
        desc: "Roomy, comfortable SUV with smart tech, flexible cargo space, and family-ready convenience.",
        features: ["Family Friendly", "Roomy Cargo", "Safety Tech", "Great MPG"],
        cta: "CHECK AVAILABILITY",
        tag: "Family Favorite",
        shortType: "SUV",
        image: "https://loremflickr.com/800/400/suv,honda?random=3"
    },
    {
        model: "2024 Jeep Wrangler Sport",
        type: "4x4 SUV",
        price: "$39,750",
        desc: "Iconic off-road style with rugged capability, open-air attitude, and adventure-ready design.",
        features: ["Trail Rated", "4x4 Power", "Removable Top", "Adventure Ready"],
        cta: "EXPLORE 4X4 DEALS",
        tag: "Adventure Pick",
        shortType: "4x4",
        image: "https://loremflickr.com/800/400/jeep,wrangler?random=4"
    },
    {
        model: "2025 Chevrolet Equinox LT",
        type: "Smart SUV",
        price: "$31,480",
        desc: "Modern SUV with confident styling, useful tech, and comfort for daily driving.",
        features: ["Smart Value", "Driver Assist", "Comfort Interior", "SUV Deal"],
        cta: "GET PRE-APPROVED",
        tag: "Smart Value",
        shortType: "SUV",
        image: "https://loremflickr.com/800/400/suv,chevy?random=5"
    },
    {
        model: "2024 BMW 330i",
        type: "Luxury Sport Sedan",
        price: "$47,900",
        desc: "Premium sport sedan with refined performance, upscale comfort, and a driver-focused cockpit.",
        features: ["Luxury Interior", "Sport Handling", "Premium Audio", "Turbo Power"],
        cta: "SEE LUXURY OFFERS",
        tag: "Premium Pick",
        shortType: "Luxury",
        image: "https://loremflickr.com/800/400/bmw,sedan?random=6"
    }
];

const ROTATION_INTERVAL = 4000; // 4 seconds
let currentIndex = 0;
let progressStartTime = 0;
let progressAnimationId;

// DOM Elements
const vImg = document.getElementById('current-vehicle-img');
const vModel = document.getElementById('v-model');
const vType = document.getElementById('v-type');
const vPrice = document.getElementById('v-price');
const vDesc = document.getElementById('v-desc');
const vFeatures = document.getElementById('v-features');
const vCta = document.getElementById('v-cta');
const currentSlideNum = document.getElementById('current-slide-num');
const slideProgress = document.getElementById('slide-progress');
const infoPanel = document.querySelector('.info-panel');
const priceShimmer = document.querySelector('.price-shimmer');
const vehicleContainer = document.getElementById('vehicle-container');
const inventoryRail = document.getElementById('inventory-rail');

// Initialize Rail
function initRail() {
    vehicles.forEach((v, index) => {
        const item = document.createElement('div');
        item.className = `rail-item ${index === 0 ? 'active' : ''}`;
        item.id = `rail-item-${index}`;

        // Simple SVG icon placeholder depending on type
        let iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.09a2 2 0 0 1 1.85 1.24L9.8 11h9.1a2 2 0 0 1 1.94 1.5l1.06 4A2 2 0 0 1 20 19h-1"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>';

        item.innerHTML = `
            <div class="rail-num">0${index + 1}</div>
            <div class="rail-icon">${iconSvg}</div>
            <div class="rail-label">${v.shortType}</div>
            <div class="rail-progress" id="rail-progress-${index}"></div>
        `;
        inventoryRail.appendChild(item);
    });
}

function updateContent(index) {
    const v = vehicles[index];

    // Update text
    vModel.textContent = v.model;
    vType.textContent = v.type;
    vPrice.textContent = `Starting at ${v.price}`;
    vDesc.textContent = v.desc;
    vCta.textContent = v.cta;
    currentSlideNum.textContent = `0${index + 1}`;

    // Update features
    vFeatures.innerHTML = '';
    v.features.forEach(feat => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = feat;
        vFeatures.appendChild(chip);
    });

    // Update image
    vImg.src = v.image;

    // Trigger price shimmer
    priceShimmer.classList.remove('active');
    void priceShimmer.offsetWidth; // trigger reflow
    priceShimmer.classList.add('active');
}

function updateRail(index) {
    document.querySelectorAll('.rail-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.rail-progress').forEach(el => el.style.width = '0%');

    const activeItem = document.getElementById(`rail-item-${index}`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function animateProgress(timestamp) {
    if (!progressStartTime) progressStartTime = timestamp;
    const elapsed = timestamp - progressStartTime;

    const percentage = Math.min((elapsed / ROTATION_INTERVAL) * 100, 100);

    // Update main progress bar
    slideProgress.style.width = `${percentage}%`;

    // Update rail progress bar
    const activeRailProgress = document.getElementById(`rail-progress-${currentIndex}`);
    if (activeRailProgress) {
        activeRailProgress.style.width = `${percentage}%`;
    }

    if (elapsed < ROTATION_INTERVAL) {
        progressAnimationId = requestAnimationFrame(animateProgress);
    }
}

function transitionSlide() {
    // 1. Animate out
    vehicleContainer.classList.add('slide-out');
    infoPanel.classList.add('blur-panel');

    setTimeout(() => {
        // 2. Change content while hidden/blurred
        currentIndex = (currentIndex + 1) % vehicles.length;
        updateContent(currentIndex);
        updateRail(currentIndex);

        // Remove out animation classes
        vehicleContainer.classList.remove('slide-out');
        infoPanel.classList.remove('blur-panel');

        // 3. Animate in
        vehicleContainer.classList.add('slide-in');

        // Reset progress
        progressStartTime = 0;
        cancelAnimationFrame(progressAnimationId);
        progressAnimationId = requestAnimationFrame(animateProgress);

        setTimeout(() => {
            vehicleContainer.classList.remove('slide-in');
        }, 600); // Wait for slide in to finish

    }, 500); // Wait for slide out to finish
}

// Initialization
initRail();
updateContent(0);
updateRail(0);
progressAnimationId = requestAnimationFrame(animateProgress);
setInterval(transitionSlide, ROTATION_INTERVAL);
