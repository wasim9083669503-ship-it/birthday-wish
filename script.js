/**
 * Wasin Akram & Mamoni - Proper Script
 * Logic for Love Counter, Music Player, and Modal
 */

document.addEventListener('DOMContentLoaded', () => {
    initCounter();
    initRevealAnimations();
});

// 1. Together Since Counter
function initCounter() {
    // Set the date we're counting from (Change this to their real anniversary date if known)
    // For now, setting a placeholder date: January 1, 2023
    const togetherSince = new Date("January 1, 2023 00:00:00").getTime();

    function updateCounter() {
        const now = new Date().getTime();
        const distance = now - togetherSince;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minsEl = document.getElementById("minutes");

        if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        if (minsEl) minsEl.innerText = minutes < 10 ? "0" + minutes : minutes;
    }

    updateCounter();
    setInterval(updateCounter, 1000 * 60); // Update every minute
}

// 2. Modal Logic
const modal = document.getElementById('surprise-modal');

function showSurprise() {
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeSurprise() {
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Expose to global scope for onclick handlers
window.showSurprise = showSurprise;
window.closeSurprise = closeSurprise;

window.onclick = function(event) {
    if (event.target == modal) {
        closeSurprise();
    }
}

// 3. Music Player (Simulated)
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

if (musicBtn) {
    musicBtn.onclick = () => {
        isPlaying = !isPlaying;
        musicBtn.innerText = isPlaying ? "Pause" : "Play";
        // Logic for actual audio element could be added here
    };
}

// 4. Scroll Reveal Logic
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    const revealElements = [
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.gallery-card'),
        ...document.querySelectorAll('.glass-box'),
        ...document.querySelectorAll('.section-title')
    ];

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        observer.observe(el);
    });
}