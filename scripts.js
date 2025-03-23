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


// const teamMembers = [
//     {
//         realName: "Brenda Leyva",
//         specialty: "President",
//         status: "WANTED",
//         image: "anonymous.png"
//     },
//     {
//         realName: "Coda Richmond",
//         specialty: "Experience - Lead",
//         status: "WANTED",
//         image: "anonymous.png"
//     },
//     {
//         realName: "Julia Bowman",
//         specialty: "Outreach - lead",
//         status: "CAPTURED",
//         image: "anonymous.png"
//     }
// ];


//updated:
// Enhanced team members data
const teamMembers = [
    {
        realName: "Brenda Leyva",
        specialty: "President",
        status: "WANTED",
        image: "anonymous.png",
        threatLevel: 5
    },
    {
        realName: "Coda Richmond",
        specialty: "Experience - Lead",
        status: "WANTED",
        image: "anonymous.png",
        threatLevel: 4
    },
    {
        realName: "Julia Bowman",
        specialty: "Outreach - Lead",
        status: "CAPTURED",
        image: "anonymous.png",
        threatLevel: 3
    },
    {
        realName: "Martha",
        specialty: "Team Lead",
        status: "WANTED",
        image: "anonymous.png",
        threatLevel: 4
    },
    {
        realName: "Aleena",
        specialty: "Frontend",
        status: "WANTED",
        image: "anonymous.png",
        threatLevel: 5
    },
    {
        realName: "Levi",
        specialty: "Frontend",
        status: "CAPTURED",
        image: "anonymous.png",
        threatLevel: 3
    },
    {
        realName: "ABC",
        specialty: "ABC",
        status: "WANTED",
        image: "anonymous.png",
        threatLevel: 4
    },
    {
        realName: "PQR",
        specialty: "PQR",
        status: "CAPTURED",
        image: "anonymous.png",
        threatLevel: 3
    }
];


//apply red-blue glitch effect on mouse move
function applyRedBlueGlitch(card, e) {
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xIntensity = Math.min(5, Math.abs(mouseX - card.dataset.lastX || mouseX) / 5);
    const yIntensity = Math.min(5, Math.abs(mouseY - card.dataset.lastY || mouseY) / 5);
    const intensity = Math.max(xIntensity, yIntensity);
    
    card.dataset.lastX = mouseX;
    card.dataset.lastY = mouseY;
    
    if (intensity > 0.5) {
        //red-blue
        const redOffset = `${intensity * 2}px`;
        const blueOffset = `${-intensity * 2}px`;
        
        card.style.textShadow = `${redOffset} 0 rgba(255,0,0,0.7), ${blueOffset} 0 rgba(0,0,255,0.7)`;
        card.style.boxShadow = `${redOffset} 0 rgba(255,0,0,0.5), ${blueOffset} 0 rgba(0,0,255,0.5), 0 0 20px rgba(255,255,255,0.3)`;
        
        const textElements = card.querySelectorAll('.glitch-data');
        textElements.forEach(element => {
            element.style.textShadow = `${redOffset} 0 rgba(255,0,0,0.7), ${blueOffset} 0 rgba(0,0,255,0.7)`;
            
            //random glitch
            if (intensity > 2 && Math.random() > 0.7) {
                element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`;
                
                if (intensity > 3 && Math.random() > 0.8) {
                    const originalText = element.dataset.originalText || element.textContent;
                    if (!element.dataset.originalText) {
                        element.dataset.originalText = originalText;
                    }
                    
                    const corruptedText = originalText.split('').map(char => {
                        if (Math.random() > 0.7) {
                            return String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 5) - 2);
                        }
                        return char;
                    }).join('');
                    
                    element.textContent = corruptedText;
                    
                    setTimeout(() => {
                        element.textContent = originalText;
                    }, 150);
                }
                
                setTimeout(() => {
                    element.style.transform = 'translate(0, 0)';
                }, 100);
            }
        });
        
        card.classList.add('actively-glitching');
        setTimeout(() => {
            card.classList.remove('actively-glitching');
            card.style.textShadow = '';
            card.style.boxShadow = '';
            textElements.forEach(element => {
                element.style.textShadow = '';
            });
        }, 150);
    }
}

//table view layout with 4 columns and increased spacing
function loadTeamTable() {
    const teamContainer = document.getElementById("teamGrid");
    teamContainer.innerHTML = "";
    teamContainer.className = "team-table";

    //create table structure
    const table = document.createElement("table");
    let currentRow;
    
    teamMembers.forEach((member, index) => {
        //create a new row for every 4 members
        if (index % 4 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);
        }
        
        const cell = document.createElement("td");
        cell.classList.add("team-member-cell");
        
        const memberCard = document.createElement("div");
        memberCard.classList.add("team-member");
        
        if (member.status === "CAPTURED") {
            memberCard.classList.add("captured");
        }
        
        let threatFlames = "🔥".repeat(member.threatLevel || 3);
        
        memberCard.innerHTML = `
            <div class="status ${member.status === "CAPTURED" ? "captured" : ""}">${member.status}</div>
            <img src="${member.image}" alt="${member.realName}">
            <div class="hacker-info">
                <div class="glitch-data real-name">${member.realName}</div>
                <div class="glitch-data specialty">${member.specialty}</div>
                <div class="threat-level">${threatFlames}</div>
            </div>
        `;
        
        memberCard.addEventListener("mousemove", function(e) {
            applyRedBlueGlitch(this, e);
        });
        
        //effect on click
        memberCard.addEventListener("click", function() {
            this.style.filter = "invert(100%)";
            setTimeout(() => {
                this.style.filter = "invert(0%)";
            }, 150);
        });
        
        //Reset mouse
        memberCard.addEventListener("mouseleave", function() {
            this.style.textShadow = '';
            this.style.boxShadow = '';
            const textElements = this.querySelectorAll('.glitch-data');
            textElements.forEach(element => {
                element.style.textShadow = '';
                element.style.transform = 'translate(0, 0)';
                //Reset text
                if (element.dataset.originalText) {
                    element.textContent = element.dataset.originalText;
                }
            });
        });
        
        cell.appendChild(memberCard);
        currentRow.appendChild(cell);
    });
    
    teamContainer.appendChild(table);
}

window.addEventListener("load", loadTeamTable);
