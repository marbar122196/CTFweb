document.addEventListener("DOMContentLoaded", function () {
    const scheduleItems = document.querySelectorAll(".schedule-item");

    scheduleItems.forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
            
            // Toggle visibility of the next sibling (the .details div)
            const details = this.nextElementSibling;
            if (details && details.classList.contains("details")) {
                details.style.display = details.style.display === "block" ? "none" : "block";
            }
        });
    });
});

document.getElementById('about-btn').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('schedule-btn').addEventListener('click', () => {
    document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('faq-btn').addEventListener('click', () => {
    document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('sponsors-btn').addEventListener('click', () => {
    document.getElementById('sponsors').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('resources-btn').addEventListener('click', () => {
    document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
});
const sponsors = [
    { clean: "zebra.png", glitch: "zebra-corrupted.png" },
    { clean: "motorola.jpg", glitch: "motorola-corrupted.png" }
];

const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");

// Ensure canvas size matches display
canvas.width = 300;
canvas.height = 150;

let currentIndex = 0; // Track the current sponsor index

function pixelGlitchEffect(callback) {
    let sponsorPair = sponsors[currentIndex]; // Get the current sponsor pair
    let img = new Image();
    img.src = sponsorPair.glitch; // Load the glitched version first
    img.crossOrigin = "Anonymous"; // Prevent CORS issues

    img.onload = () => {
        let glitchSteps = 6; // Number of glitch transitions
        let step = 0;

        function applyGlitch() {
            if (step >= glitchSteps) {
                callback(sponsorPair.clean); // Switch to the official sponsor after glitching
                return;
            }

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Apply random pixelation distortion
            let pixelSize = Math.floor(Math.random() * 10) + 2;
            ctx.drawImage(img, 0, 0, canvas.width / pixelSize, canvas.height / pixelSize);
            ctx.drawImage(canvas, 0, 0, canvas.width / pixelSize, canvas.height / pixelSize, 0, 0, canvas.width, canvas.height);

            // Add random scan lines
            for (let i = 0; i < 5; i++) {
                let y = Math.random() * canvas.height;
                ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
                ctx.fillRect(0, y, canvas.width, 2);
            }

            // Add RGB shift effect
            ctx.globalCompositeOperation = "difference";
            ctx.drawImage(img, Math.random() * 10 - 5, Math.random() * 10 - 5, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";

            step++;
            setTimeout(applyGlitch, 100);
        }

        applyGlitch();
    };

    img.onerror = () => {
        console.error("Error loading glitch image:", sponsorPair.glitch);
    };
}

function displayOfficialSponsor(officialImage) {
    let officialImg = new Image();
    officialImg.src = officialImage;
    officialImg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(officialImg, 0, 0, canvas.width, canvas.height);
    };
}

function glitchThenShowOfficial() {
    pixelGlitchEffect((officialImage) => {
        setTimeout(() => {
            displayOfficialSponsor(officialImage);
            currentIndex = (currentIndex + 1) % sponsors.length; // Cycle to the next sponsor
        }, 200);
    });
}

// Run the glitch effect every 3 seconds, then settle on the correct official sponsor
setInterval(glitchThenShowOfficial, 3000);
