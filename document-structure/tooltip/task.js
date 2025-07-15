document.addEventListener('DOMContentLoaded', () => {
    const tooltipElements = document.querySelectorAll('.has-tooltip');
    const removeActiveTooltips = () => {
        document.querySelectorAll('.tooltip_active').forEach(tooltip => {
            tooltip.remove();
        });
    };
    tooltipElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            removeActiveTooltips();
            const tooltipText = element.getAttribute('title');
            const position = element.getAttribute('data-position') || 'top';
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip tooltip_active';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            const elementRect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            let left, top;
            switch(position) {
                case 'right':
                    left = elementRect.right + 5;
                    top = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
                    break;
                case 'left':
                    left = elementRect.left - tooltipRect.width - 5;
                    top = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
                    break;
                case 'bottom':
                    left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
                    top = elementRect.bottom + 5;
                    break;
                case 'top':
                default:
                    left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
                    top = elementRect.top - tooltipRect.height - 5;
                    break;
            }
            tooltip.style.left = `${left + window.scrollX}px`;
            tooltip.style.top = `${top + window.scrollY}px`;
            document.addEventListener('click', function closeTooltip(e) {
                if (!element.contains(e.target) && !tooltip.contains(e.target)) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            }, { once: true });
        });
    });
});