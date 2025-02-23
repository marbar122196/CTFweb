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
