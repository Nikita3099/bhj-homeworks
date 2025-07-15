const quantityControls = document.querySelectorAll('.product__quantity-control');
const addButtons = document.querySelectorAll('.product__add');
const cartProducts = document.querySelector('.cart__products');

quantityControls.forEach(control => {
    control.addEventListener('click', () => {
        const quantityElement = control.parentElement.querySelector('.product__quantity-value');
        let quantity = parseInt(quantityElement.textContent);
        
        if (control.classList.contains('product__quantity-control_inc')) {
            quantity++;
        } else if (control.classList.contains('product__quantity-control_dec') && quantity > 1) {
            quantity--;
        }
        
        quantityElement.textContent = quantity;
    });
});

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productId = product.dataset.id;
        const productImage = product.querySelector('.product__image').src;
        const quantity = parseInt(product.querySelector('.product__quantity-value').textContent);
        
        const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);
        
        if (existingProduct) {
            const productCount = existingProduct.querySelector('.cart__product-count');
            productCount.textContent = parseInt(productCount.textContent) + quantity;
        } else {
            const cartProduct = document.createElement('div');
            cartProduct.classList.add('cart__product');
            cartProduct.dataset.id = productId;
            cartProduct.innerHTML = `
                <img class="cart__product-image" src="${productImage}">
                <div class="cart__product-count">${quantity}</div>
            `;
            cartProducts.appendChild(cartProduct);
        }
        
        const productImg = product.querySelector('.product__image');
        const cartImg = cartProducts.lastElementChild.querySelector('.cart__product-image') || existingProduct.querySelector('.cart__product-image');
        
        const startRect = productImg.getBoundingClientRect();
        const endRect = cartImg.getBoundingClientRect();
        
        const shadow = productImg.cloneNode();
        shadow.classList.add('product-shadow');
        document.body.appendChild(shadow);
        
        shadow.style.position = 'absolute';
        shadow.style.left = `${startRect.left}px`;
        shadow.style.top = `${startRect.top}px`;
        shadow.style.width = `${startRect.width}px`;
        shadow.style.height = `${startRect.height}px`;
        shadow.style.zIndex = '1000';
        
        const deltaX = endRect.left - startRect.left;
        const deltaY = endRect.top - startRect.top;
        const steps = 20;
        let currentStep = 0;
        
        const animate = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            shadow.style.left = `${startRect.left + deltaX * progress}px`;
            shadow.style.top = `${startRect.top + deltaY * progress}px`;
            
            if (currentStep >= steps) {
                clearInterval(animate);
                shadow.remove();
            }
        }, 20);
    });
});