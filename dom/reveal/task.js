const revealElements = document.querySelectorAll('.reveal');

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.top <= window.innerHeight
    );
}

function handleScroll() {
    revealElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('reveal_active');
        } else {
            element.classList.remove('reveal_active');
        }
    });
}

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', handleScroll);