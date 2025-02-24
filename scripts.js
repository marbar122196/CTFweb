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
    { clean: "zebrawhite.png", glitch: "zebra-glitch.png" },
    { clean: "motorolawhite.jpg", glitch: "motorola-glitch.png" },
    { clean: "cmeGroup.png", glitch: "cmeGroup-glitch.png" }
];

const partners = [
    { clean: "imanage.png", glitch: "imanage-glitch.png" },
];

let sponsorIndex = 0;
let partnerIndex = 0;

// Get canvases and contexts
const sponsorCanvas = document.getElementById("sponsor-canvas");
const partnerCanvas = document.getElementById("partner-canvas");

const sponsorCtx = sponsorCanvas.getContext("2d");
const partnerCtx = partnerCanvas.getContext("2d");

// Resize canvases dynamically
function resizeCanvas() {
    const sponsorContainer = document.querySelector(".sponsor-display");
    const partnerContainer = document.querySelector(".partner-display");

    sponsorCanvas.width = sponsorContainer.clientWidth;
    sponsorCanvas.height = sponsorContainer.clientHeight;

    partnerCanvas.width = partnerContainer.clientWidth;
    partnerCanvas.height = partnerContainer.clientHeight;
}

// Apply glitch effect before showing the clean logo
function pixelGlitchEffect(canvas, ctx, imagePair, callback) {
    let glitchImg = new Image();
    glitchImg.src = imagePair.glitch;
    glitchImg.crossOrigin = "Anonymous"; // Prevent CORS issues

    glitchImg.onload = () => {
        let glitchSteps = 6; // Number of glitch transitions
        let step = 0;

        function applyGlitch() {
            if (step >= glitchSteps) {
                callback(imagePair.clean); // Show clean logo after glitching
                return;
            }

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Apply pixelation with random distortion
            let pixelSize = Math.floor(Math.random() * 10) + 2;
            ctx.drawImage(glitchImg, 0, 0, canvas.width / pixelSize, canvas.height / pixelSize);
            ctx.drawImage(canvas, 0, 0, canvas.width / pixelSize, canvas.height / pixelSize, 0, 0, canvas.width, canvas.height);

            // Add random horizontal scan lines
            for (let i = 0; i < 5; i++) {
                let y = Math.random() * canvas.height;
                ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
                ctx.fillRect(0, y, canvas.width, 2);
            }

            // Add slight RGB shift effect
            ctx.globalCompositeOperation = "difference";
            ctx.drawImage(glitchImg, Math.random() * 10 - 5, Math.random() * 10 - 5, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";

            step++;
            setTimeout(applyGlitch, 100);
        }

        applyGlitch();
    };

    glitchImg.onerror = () => {
        console.error("Error loading glitch image:", imagePair.glitch);
    };
}

// Display the official logo after glitch effect
function displayOfficialLogo(canvas, ctx, officialImage) {
    let officialImg = new Image();
    officialImg.src = officialImage;
    officialImg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(officialImg, 0, 0, canvas.width, canvas.height);
    };
}

// Function to glitch first, then display sponsor logo
function glitchThenShowSponsor() {
    let sponsorPair = sponsors[sponsorIndex];
    pixelGlitchEffect(sponsorCanvas, sponsorCtx, sponsorPair, (cleanLogo) => {
        setTimeout(() => {
            displayOfficialLogo(sponsorCanvas, sponsorCtx, cleanLogo);
            sponsorIndex = (sponsorIndex + 1) % sponsors.length; // Cycle through sponsors
        }, 200);
    });
}

// Function to glitch first, then display partner logo
function glitchThenShowPartner() {
    let partnerPair = partners[partnerIndex];
    pixelGlitchEffect(partnerCanvas, partnerCtx, partnerPair, (cleanLogo) => {
        setTimeout(() => {
            displayOfficialLogo(partnerCanvas, partnerCtx, cleanLogo);
            partnerIndex = (partnerIndex + 1) % partners.length; // Cycle through partners
        }, 200);
    });
}

// Resize canvas and start the glitch rotation
window.addEventListener("load", () => {
    resizeCanvas();
    glitchThenShowSponsor();
    glitchThenShowPartner();
});
window.addEventListener("resize", resizeCanvas);

// Rotate sponsor and partner logos every 3 seconds
setInterval(glitchThenShowSponsor, 3000);
setInterval(glitchThenShowPartner, 3000);
