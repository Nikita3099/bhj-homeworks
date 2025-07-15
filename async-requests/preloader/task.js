document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const items = document.getElementById('items');
    
    function displayCurrencies(currencies) {
        items.innerHTML = '';
        for (const currency in currencies) {
            const { CharCode, Value } = currencies[currency];
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <div class="item__code">${CharCode}</div>
                <div class="item__value">${Value}</div>
                <div class="item__currency">руб.</div>
            `;
            items.appendChild(item);
        }
    }

    function saveToLocalStorage(data) {
        localStorage.setItem('currencyData', JSON.stringify(data));
        localStorage.setItem('currencyTimestamp', Date.now());
    }

    function getCachedData() {
        const data = localStorage.getItem('currencyData');
        const timestamp = localStorage.getItem('currencyTimestamp');
        
        if (data && timestamp && (Date.now() - timestamp < 3600000)) {
            return JSON.parse(data);
        }
        return null;
    }

    function loadCurrencies() {
        loader.classList.add('loader_active');

        const cachedData = getCachedData();
        if (cachedData) {
            displayCurrencies(cachedData.response.Valute);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses', true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                saveToLocalStorage(data);
                displayCurrencies(data.response.Valute);
                loader.classList.remove('loader_active');
            }
        };

        xhr.onerror = function() {
            console.error('Error loading currency data');
            loader.classList.remove('loader_active');
        };

        xhr.send();
    }

    loadCurrencies();
});