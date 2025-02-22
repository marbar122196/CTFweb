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