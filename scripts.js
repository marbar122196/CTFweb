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
