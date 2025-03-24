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


/* faq - answer drop down script */ 
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const itemsPerRow = 3; // DONT CHANGE THIS there are 3 items per row

    function closeAllAnswers() {
        faqItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('.faq-answer')) {
                item.querySelector('.faq-answer').style.top = '';
            }
        });

        // margin reset only for items that have been shifted
        faqItems.forEach(item => {
            item.style.marginTop = '0';
        });
    }

    function handleFAQClick(e) {
        const item = e.currentTarget;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        // if already open, close everything
        if (isActive) {
            closeAllAnswers();
            return;
        }

        // close all others
        closeAllAnswers();

        // open clicked answer
        item.classList.add('active');

        // this is calculating positioning
        const itemRect = item.getBoundingClientRect(); /* this just returns the size of element and the position for vp */ 
        const itemIndex = Array.from(faqItems).indexOf(item);
        const rowIndex = Math.floor(itemIndex / itemsPerRow);

        if (answer) {
            const answerHeight = answer.offsetHeight;
            answer.style.top = `${itemRect.height}px`;

            // THREE ITEMS in next row are moved 
            const startNextRow = (rowIndex + 1) * itemsPerRow;

            for (let i = 0; i < itemsPerRow; i++) {
                const nextItem = faqItems[startNextRow + i];
                if (nextItem) {
                    nextItem.style.marginTop = `${answerHeight + 20}px`; // extra padding for safety
                }
            }
        }
    }

    faqItems.forEach(item => {
        item.addEventListener('click', handleFAQClick);
    });
});

const mainSponsor = { clean: "zebrawhite.png", glitch: "zebra-glitch.png" };

const sponsors = [
    { clean: "motorolawhite.jpg", glitch: "motorola-glitch.png" },
    { clean: "cmeGroup.png", glitch: "cmeGroup-glitch.png" },
    { clean: "discover.png", glitch: "discover-glitch.png" }
];

const partners = [
    { clean: "imanage.png", glitch: "imanage-glitch.png" },
    { clean: "caci.avif", glitch: "caci-glitch.png" }
];

// Get canvas elements
const mainSponsorCanvas = document.getElementById("main-sponsor-canvas");

const sponsorCanvases = [
    document.getElementById("sponsor-canvas-1"),
    document.getElementById("sponsor-canvas-2"),
    document.getElementById("sponsor-canvas-3")
];

const partnerCanvases = [
    document.getElementById("partner-canvas-1"),
    document.getElementById("partner-canvas-2")
];

// Get 2D contexts
const mainSponsorCtx = mainSponsorCanvas.getContext("2d");
const sponsorCtxs = sponsorCanvases.map(canvas => canvas.getContext("2d"));
const partnerCtxs = partnerCanvases.map(canvas => canvas.getContext("2d"));

// Resize canvases dynamically
function resizeCanvas() {
    const mainSponsorContainer = document.querySelector(".sponsor-display");
    mainSponsorCanvas.width = mainSponsorContainer.clientWidth;
    mainSponsorCanvas.height = mainSponsorContainer.clientHeight;

    sponsorCanvases.forEach((canvas) => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });

    partnerCanvases.forEach((canvas) => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });
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

// Apply glitch effect then show the final logo
function glitchThenShow(canvas, ctx, imagePair) {
    pixelGlitchEffect(canvas, ctx, imagePair, (cleanLogo) => {
        setTimeout(() => {
            displayOfficialLogo(canvas, ctx, cleanLogo);
        }, 200);
    });
}

// Function to start glitching at **random intervals**
function startRandomGlitchLoop(canvas, ctx, imagePair) {
    function glitchWithRandomDelay() {
        glitchThenShow(canvas, ctx, imagePair);
        
        // Generate a new random interval between **8 to 15 seconds**
        let randomDelay = Math.floor(Math.random() * (10000 - 5000) + 5000); 
        
        setTimeout(glitchWithRandomDelay, randomDelay);
    }

    glitchWithRandomDelay(); // Start immediately
}

// Run glitches on all elements with random timing
function applyGlitchesWithRandomization() {
    startRandomGlitchLoop(mainSponsorCanvas, mainSponsorCtx, mainSponsor);

    sponsors.forEach((sponsor, index) => {
        if (sponsorCanvases[index]) {
            startRandomGlitchLoop(sponsorCanvases[index], sponsorCtxs[index], sponsor);
        }
    });

    partners.forEach((partner, index) => {
        if (partnerCanvases[index]) {
            startRandomGlitchLoop(partnerCanvases[index], partnerCtxs[index], partner);
        }
    });
}

// Resize canvas and start random glitches
window.addEventListener("load", () => {
    resizeCanvas();
    applyGlitchesWithRandomization();
});
window.addEventListener("resize", resizeCanvas);


const teamMembers = [
    {
        realName: "Brenda Leyva",
        specialty: "President",
        status: "WANTED",
        image: "anonymous.jpg"
    },
    {
        realName: "Coda Richmond",
        specialty: "Experience - Lead",
        status: "WANTED",
        image: "anonymous.jpg"
    },
    {
        realName: "Julia Bowman",
        specialty: "Outreach - lead",
        status: "CAPTURED",
        image: "anonymous.jpg"
    }
];

// Function to dynamically load the team section
function loadTeam() {
    const teamGrid = document.getElementById("teamGrid");
    teamGrid.innerHTML = "";

    teamMembers.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("team-member");

        // Add 'captured' class for styling if needed
        if (member.status === "CAPTURED") {
            memberCard.classList.add("captured");
        }

        // Threat level visualization (🔥🔥🔥🔥🔥)
        let threatFlames = "🔥".repeat(member.threatLevel);

        memberCard.innerHTML = `
            <div class="status ${member.status === "CAPTURED" ? "captured" : ""}">${member.status}</div>
            <img src="${member.image}" alt="${member.realName}">
            <div class="hacker-info">
                <div class="alias">${member.realName}</div>
                <div class="specialty">${member.specialty}</div>
            </div>
        `;

        teamGrid.appendChild(memberCard);
    });
}

// Load team on page load
window.addEventListener("load", loadTeam);
